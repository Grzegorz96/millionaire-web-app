// Import of required modules.
import { elementsOfHtml, game, user } from "./config.js";
import { getData, postData } from "./requests.js";
import {
    switchDisplay,
    setNavbarButtons,
    displayPopup,
    playSound,
    playFiftyFiftySoundEffect,
    checkSessionOfUser,
} from "./generalFunctions.js";

// Function responsible for preparing the game.
function prepareGame() {
    // If the dropdown menu is currently open, close it automatically.
    if (elementsOfHtml.dropDownMenuIsOpen) elementsOfHtml.toggleBtn.click();

    // A case where questions have been successfully downloaded.
    if (game.questions) {
        // Asynchronous download of top five players.
        getBestFiveScores();

        // Assigning a new game start time.
        game.startTime = new Date();

        // Starting the game function.
        inGame();

        // Calling the function that loads the game container.
        loadGameContainer();
    } else {
        // Otherwise, display an error message.
        displayPopup(
            "Wystąpił błąd podczas pobierania pytań, spróbuj ponownie później.",
            1
        );
    }
}

// Function repeated for each subsequent question.
function inGame() {
    // Randomizing a new question with the current difficulty level.
    drawQuestion();

    // Displaying the question on the game panel.
    displayQuestion();

    // Play the question start sound.
    playSound("startQuestion");

    // Enabling answer buttons and game buttons.
    changeStanOfButtons(false);
}

// Function responsible for draw a question.
function drawQuestion() {
    // An empty list of questions with the current difficulty level.
    const actualLevelOfQuestions = [];

    // if the list is empty, questions with the current difficulty level will be added to it.
    while (!actualLevelOfQuestions.length) {
        for (let question of game.currentQuestions) {
            if (question.difficulty == game.numberOfQuestion) {
                actualLevelOfQuestions.push(question);
            }
        }

        // In case nothing has been added to the list, which means that the questions with the current level have ended, the list of current questions will be overwritten and the
        // questions will be added to the actualLevelOfQuestions again.
        if (!actualLevelOfQuestions.length) {
            game.currentQuestions = [...game.questions];
        }
    }

    // Drawing question from the list.
    const question =
        actualLevelOfQuestions[
            Math.floor(Math.random() * actualLevelOfQuestions.length)
        ];

    // Removing question from currenQuestions.
    game.currentQuestions.splice(game.currentQuestions.indexOf(question), 1);

    // Assigning a question to the currentQuestion property on the game object.
    game.currentQuestion = question;
}

// Function responsible for displaying a question.
function displayQuestion() {
    // Highlighting the current div with the amount to be won.
    elementsOfHtml.priceLabels[game.numberOfQuestion].classList.add(
        "price-label--activated"
    );

    // Highlighting the achieved div with the guaranteed amount.
    if (
        game.numberOfQuestion > 0 &&
        elementsOfHtml.priceLabels[
            game.numberOfQuestion - 1
        ].classList.contains("price-guaranteed")
    ) {
        elementsOfHtml.priceLabels[game.numberOfQuestion - 1].classList.add(
            "price-guaranteed--achieved"
        );
    }

    // Displaying number of current question.
    elementsOfHtml.questionNumber.innerText = `Pytanie: ${
        game.numberOfQuestion + 1
    }`;

    // Displaying content of current question.
    elementsOfHtml.questionContent.innerText = game.currentQuestion.content;

    // Displaying current answers.
    for (let answer of elementsOfHtml.answers) {
        answer.innerHTML = `<b style="color:rgb(240, 236, 10);">${
            answer.classList[1]
        }:</b> ${game.currentQuestion[answer.classList[1]]}`;
    }
}

// Function responsible for checking the selected answer.
async function checkAnswer(selectedButton) {
    // Assign the selected answer (A, B, C, D) from the selected button.
    const answer = selectedButton.classList[1];

    // Disabling answer buttons and game buttons.
    changeStanOfButtons(true);

    // Calling a function that changes the color of the selected button.
    setSelectedAnswer(selectedButton, answer, "rgb(199, 125, 14)");

    // Playing the question checking sound.
    playSound("checkingQuestion");

    // Timeout lasting 4.6 seconds.
    await awaitTimeout(4600);

    // The case when the selected answer is equal to the correct answer to the question
    if (game.currentQuestion.right_answer == answer) {
        // Calling a function that changes the color of the selected button.
        setSelectedAnswer(selectedButton, answer, "rgb(5, 255, 13)");

        // Playing the win sound.
        playSound("win");

        // If the current question number is 1, 6 or 11, the guaranteed amount will be updated.
        if ([1, 6, 11].includes(game.numberOfQuestion))
            game.priceGuaranteed = game.listOfAmounts[game.numberOfQuestion];

        // Updating the current winning amount.
        game.currentWon = game.listOfAmounts[game.numberOfQuestion];

        // Timeout lasting 4.5 seconds.
        await awaitTimeout(4500);

        // Restoring the default properties to the selected button.
        setDefaultValues(selectedButton);

        // In case the question number is not equal to 11, I increase the number by one and run the game functions again.
        if (game.numberOfQuestion != 11) {
            game.numberOfQuestion += 1;
            inGame();
            // Otherwise, the user has won the game and the game over function is triggered.
        } else {
            endGame(false);
        }
        // In case the user selected the wrong answer.
    } else {
        // Determining the button with the correct answer.
        for (let button of elementsOfHtml.answers) {
            if (button.classList.contains(game.currentQuestion.right_answer)) {
                var rightButton = button;
            }
        }
        // Calling a function that changes the color of the selected button.
        setSelectedAnswer(selectedButton, answer, "rgb(255, 30, 0)");

        // Calling a function that changes the color of the right button.
        setRightAnswer(rightButton);

        // Playing the fail sound.
        playSound("fail");

        // Timeout lasting 4.5 seconds.
        await awaitTimeout(4500);

        // Restoring the default properties to the selected button and right button.
        setDefaultValues(selectedButton, rightButton);

        // Calling the end game function.
        endGame(false);
    }
}

// Function responsible for triggering the delay.
function awaitTimeout(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

// Function responsible for the end game procedure.
function endGame(isFromButton) {
    // Calculation of game duration in seconds.
    const gameDuration = (new Date() - game.startTime) / 1000;

    // If the function was called from a button, additional operations must be performed.
    if (isFromButton) {
        // Assignment of winning amount from currentWon.
        var amountWon = game.currentWon;
        // Clearing the flag on the price labels.
        Array.from(elementsOfHtml.priceLabels).forEach((label) => {
            label.classList.remove("price-label--activated");
        });
        // Disabling answer buttons and game buttons.
        changeStanOfButtons(true);
        // When the function was not called from a button but from the answer checking function, the winning amount is taken from the guaranteed price.
    } else {
        var amountWon = game.priceGuaranteed;
    }

    // Setting default values after finishing the game.
    game.isFiftyFiftyAvailable = true;
    elementsOfHtml.gameBtns[0].removeAttribute("style");
    game.numberOfQuestion = 0;
    game.currentQuestion = undefined;
    game.priceGuaranteed = 0;
    game.currentWon = 0;
    game.startTime = undefined;
    elementsOfHtml.questionNumber.innerText = "";
    elementsOfHtml.questionContent.innerText = "";
    Array.from(elementsOfHtml.answers).forEach((button) => {
        button.innerHTML = "";
    });
    Array.from(elementsOfHtml.priceLabels).forEach((label) => {
        label.classList.remove("price-guaranteed--achieved");
    });

    // Calculating the player's result.
    const result = Math.floor(amountWon / gameDuration);

    // Loading the end game container.
    loadEndGameContainer(amountWon, result);
}

// Function responsible for turning off and on the buttons on the game screen.
function changeStanOfButtons(disabled) {
    // Changing the state of answer buttons.
    Array.from(elementsOfHtml.answers).forEach((button) => {
        button.disabled = disabled;
    });

    // Changing the state of game buttons.
    if (game.isFiftyFiftyAvailable) {
        Array.from(elementsOfHtml.gameBtns).forEach((button) => {
            button.disabled = disabled;
        });
    } else {
        elementsOfHtml.gameBtns[1].disabled = disabled;
    }
}

// Function responsible for setting the correct answer button when selecting an incorrect answer.
function setRightAnswer(rightButton) {
    // Set the b element to white color.
    rightButton.children[0].style.color = "white";

    // Adding a class to a button.
    rightButton.classList.add("right-answer");

    // Changing CSS global variable with correct answer to green color.
    document
        .querySelector(":root")
        .style.setProperty(
            `--${game.currentQuestion.right_answer}`,
            "rgb(5, 255, 13)"
        );
}

// Function responsible for setting the selected button.
function setSelectedAnswer(selectedButton, beforeVariable, currentColor) {
    // Changing CSS global variable selected-answer-background to current color.
    document
        .querySelector(":root")
        .style.setProperty(`--selected-answer-background`, currentColor);

    // If the selected button does not yet have a selected-answer class, I add it and change the color of element b.
    if (!selectedButton.classList.contains("selected-answer")) {
        selectedButton.children[0].style.color = "white";
        selectedButton.classList.add("selected-answer");
    }

    // Changing CSS global variable with selected answer to current color.
    document
        .querySelector(":root")
        .style.setProperty(`--${beforeVariable}`, currentColor);
}

// Function responsible for restoring default settings for buttons and price labels.
function setDefaultValues(selectedButton, rightButton) {
    // Clearing the flag on the price labels.
    Array.from(elementsOfHtml.priceLabels).forEach((label) => {
        label.classList.remove("price-label--activated");
    });

    // Removing the selected-answer class from the selected button.
    selectedButton.classList.remove("selected-answer");

    // If the function was called from rightButton also removes the right-answer class.
    if (rightButton) rightButton.classList.remove("right-answer");

    // Removing overridden styles for the root element (html).
    document.querySelector(":root").removeAttribute("style");
}

// Function responsible for loading the game container.
function loadGameContainer() {
    // Remove all navigation buttons.
    for (let element of elementsOfHtml.loggedInBtns) {
        element.classList.remove("navbar-buttons--activated");
    }

    for (let element of elementsOfHtml.loggedOutBtns) {
        element.classList.remove("navbar-buttons--activated");
    }

    // Setting display for toggleBtn to none.
    elementsOfHtml.toggleBtn.style.display = "none";

    // Changing the background image.
    document.body.style.backgroundImage = "url(images/in-game.jpg)";

    // Change the displayed container.
    switchDisplay(4);
}

// Function responsible for loading the main container.
function loadMainContainer() {
    // When a user is logged in, check the validity of their session.
    if (
        localStorage.getItem("accessToken") ||
        localStorage.getItem("refreshToken")
    ) {
        if (!checkSessionOfUser(false)) return;
    }

    // Clearing the amount and result
    elementsOfHtml.amountAndResult[0].innerText = "";
    elementsOfHtml.amountAndResult[1].innerText = "";

    // Setting navigation buttons.
    setNavbarButtons();

    // Remove overridden style for toggleBtn element.
    elementsOfHtml.toggleBtn.removeAttribute("style");

    // Change the displayed container.
    switchDisplay(0);
}

// Function responsible for loading the end game container.
function loadEndGameContainer(amountWon, result) {
    // Display of winning amount and player's score.
    elementsOfHtml.amountAndResult[0].innerText = `Wygrana kwota: ${amountWon}zł`;
    elementsOfHtml.amountAndResult[1].innerText = `Twój wynik: ${result}pkt`;

    // Once the top five players have been successfully downloaded, displaying them.
    if (game.bestFivePlayers) {
        for (let i = 0; i < game.bestFivePlayers.length; i++) {
            elementsOfHtml.resultlabels[
                i
            ].children[0].innerText = `${game.bestFivePlayers[i].first_name} ${game.bestFivePlayers[i].last_name}`;
            elementsOfHtml.resultlabels[
                i
            ].children[1].innerText = `${game.bestFivePlayers[i].points}pkt`;
        }
    }

    // When the user has scored more than 1000 points and is logged in, the result is added to the database.
    if (
        result > 1000 &&
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
    ) {
        postScore({ user_id: user.userId, points: result });
    }

    // Remove overridden style for body element.
    document.body.removeAttribute("style");

    // Change the displayed container.
    switchDisplay(5);

    // Playing the millioner sound.
    playSound("millioner");
}

// The function responsible for creating a fifty-fifty lifeline.
function fiftyFifty() {
    // Setting the flag to false, disabling the 50/50 button and changing its color.
    game.isFiftyFiftyAvailable = false;
    elementsOfHtml.gameBtns[0].disabled = true;
    elementsOfHtml.gameBtns[0].style.backgroundColor = "#4d0004";

    // Playing the fiftyFifty sound effect.
    playFiftyFiftySoundEffect();

    // Remove the correct answer from the list.
    const badAnswers = ["A", "B", "C", "D"].filter(
        (answer) => answer != game.currentQuestion.right_answer
    );

    // Drawing one wrong answer and removing it.
    badAnswers.splice(Math.floor(Math.random() * badAnswers.length), 1);

    // Disabling and clearing buttons with incorrect answers.
    Array.from(elementsOfHtml.answers).forEach((button) => {
        if (badAnswers.includes(button.classList[1])) {
            button.innerHTML = "";
            button.disabled = true;
        }
    });
}

// Function responsible for downloading questions.
async function getQuestions() {
    // Sending a request to download questions.
    const getQuestionsResponse = await getData(
        "https://Grzegorz96.pythonanywhere.com/questions"
    );

    // When the user receives status 200, then assign questions to game.questions and create copy version to modify.
    if (getQuestionsResponse.status == 200) {
        game.questions = (await getQuestionsResponse.json()).result;
        game.currentQuestions = [...game.questions];
    }
}

// Function responsible for sending points to the backend.
async function postScore(data) {
    // Sending a request with sending points.
    const postScoreResponse = await postData(
        "https://Grzegorz96.pythonanywhere.com/scores",
        data,
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken")
    );

    // Case of receiving status 201.
    if (postScoreResponse.status == 201) {
        // If an access token was received in the header, overwrite the token and retry the request.
        if (postScoreResponse.headers.get("access-token")) {
            localStorage.setItem(
                "accessToken",
                postScoreResponse.headers.get("access-token")
            );

            await postScore(data);
            // If there is no new access token, the operation was successful and a message is displayed.
        } else {
            displayPopup(
                `Twój wynik: ${data.points}pkt, został dodany do listy najlepszych wyników !`,
                4
            );
        }
        // In any other case, display an error message.
    } else {
        displayPopup(
            "Wystąpił błąd podczas dodawania punktów do listy najlepszych wyników.",
            4
        );
    }
}

// Function responsible for downloading the 5 best results.
async function getBestFiveScores() {
    // Sending a request with getting 5 best results.
    const getBestFiveScoresResponse = await getData(
        "https://Grzegorz96.pythonanywhere.com/scores?limit=5"
    );

    // If you receive a status of 200, assign the result to the object's property.
    if (getBestFiveScoresResponse.status == 200) {
        game.bestFivePlayers = (await getBestFiveScoresResponse.json()).result;
    }
}

// export functions.
export {
    prepareGame,
    checkAnswer,
    endGame,
    loadMainContainer,
    fiftyFifty,
    getQuestions,
};
