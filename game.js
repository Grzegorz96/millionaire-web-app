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
        // Calling the function that loads the game container.
        loadGameContainer();
        // Asynchronous download of top five players.
        getBestFiveScores();
        // Assigning a new game start time.
        game.startTime = new Date();
        // Starting the game function.
        inGame();
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
        //
        setDefaultValues(selectedButton);
        if (game.numberOfQuestion != 11) {
            game.numberOfQuestion += 1;
            inGame();
        } else {
            endGame(false);
        }
    } else {
        for (let button of elementsOfHtml.answers) {
            if (button.classList.contains(game.currentQuestion.right_answer)) {
                var rightButton = button;
            }
        }
        setSelectedAnswer(selectedButton, answer, "rgb(255, 30, 0)");
        setRightAnswer(rightButton);
        playSound("fail");
        await awaitTimeout(4500);
        setDefaultValues(selectedButton, rightButton);
        endGame(false);
    }
}

function awaitTimeout(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

function endGame(isFromButton) {
    const gameDuration = (new Date() - game.startTime) / 1000; // time of game duration in seconds.

    if (isFromButton) {
        var amountWon = game.currentWon;
        Array.from(elementsOfHtml.priceLabels).forEach((label) => {
            label.classList.remove("price-label--activated");
        });
        changeStanOfButtons(true);
    } else {
        var amountWon = game.priceGuaranteed;
    }

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

    const result = Math.floor(amountWon / gameDuration);
    loadEndGameContainer(amountWon, result);
}

function changeStanOfButtons(disabled) {
    Array.from(elementsOfHtml.answers).forEach((button) => {
        button.disabled = disabled;
    });

    if (game.isFiftyFiftyAvailable) {
        Array.from(elementsOfHtml.gameBtns).forEach((button) => {
            button.disabled = disabled;
        });
    } else {
        elementsOfHtml.gameBtns[1].disabled = disabled;
    }
}

function setRightAnswer(rightButton) {
    rightButton.classList.add("right-answer");
    rightButton.children[0].style.color = "white";

    document
        .querySelector(":root")
        .style.setProperty(
            `--${game.currentQuestion.right_answer}`,
            "rgb(5, 255, 13)"
        );
}

function setSelectedAnswer(selectedButton, beforeVariable, currentColor) {
    selectedButton.classList.add("selected-answer");
    selectedButton.children[0].style.color = "white";

    document
        .querySelector(":root")
        .style.setProperty(`--${beforeVariable}`, currentColor);

    document
        .querySelector(":root")
        .style.setProperty(`--selected-answer-background`, currentColor);
}

function setDefaultValues(selectedButton, rightButton) {
    Array.from(elementsOfHtml.priceLabels).forEach((label) => {
        label.classList.remove("price-label--activated");
    });

    document.querySelector(":root").removeAttribute("style");
    selectedButton.classList.remove("selected-answer");

    if (rightButton) {
        rightButton.classList.remove("right-answer");
    }
}

function loadGameContainer() {
    for (let element of elementsOfHtml.loggedInBtns) {
        element.classList.remove("navbar-buttons--activated");
    }

    for (let element of elementsOfHtml.loggedOutBtns) {
        element.classList.remove("navbar-buttons--activated");
    }

    elementsOfHtml.toggleBtn.style.display = "none";
    document.body.style.backgroundImage = "url(images/in-game.jpg)";
    switchDisplay(4);
}

function loadMainContainer() {
    if (
        localStorage.getItem("accessToken") ||
        localStorage.getItem("refreshToken")
    ) {
        if (!checkSessionOfUser(false)) return;
    }
    elementsOfHtml.amountAndResult[0].innerText = "";
    elementsOfHtml.amountAndResult[1].innerText = "";
    setNavbarButtons();
    elementsOfHtml.toggleBtn.removeAttribute("style");
    switchDisplay(0);
}

function loadEndGameContainer(amountWon, result) {
    elementsOfHtml.amountAndResult[0].innerText = `Wygrana kwota: ${amountWon}zł`;
    elementsOfHtml.amountAndResult[1].innerText = `Twój wynik: ${result}pkt`;
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

    if (
        result > 1000 &&
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
    ) {
        postScore({ user_id: user.userId, points: result });
    }
    document.body.removeAttribute("style");
    switchDisplay(5);
    playSound("millioner");
}

function fiftyFifty() {
    game.isFiftyFiftyAvailable = false;
    elementsOfHtml.gameBtns[0].disabled = true;
    elementsOfHtml.gameBtns[0].style.backgroundColor = "#4d0004";

    const badAnswers = ["A", "B", "C", "D"].filter(
        (answer) => answer != game.currentQuestion.right_answer
    );

    badAnswers.splice(Math.floor(Math.random() * badAnswers.length), 1);

    Array.from(elementsOfHtml.answers).forEach((button) => {
        if (badAnswers.includes(button.classList[1])) {
            button.innerHTML = "";
            button.disabled = true;
        }
    });
    playFiftyFiftySoundEffect();
}

// Loading of questions.
async function getQuestions() {
    const getQuestionsResponse = await getData(
        "https://Grzegorz96.pythonanywhere.com/questions"
    );

    if (getQuestionsResponse.status == 200) {
        game.questions = (await getQuestionsResponse.json()).result; // basic version of questions
        game.currentQuestions = [...game.questions]; // version of questions to modify
    }
}

async function postScore(data) {
    // Sending score.
    const postScoreResponse = await postData(
        "https://Grzegorz96.pythonanywhere.com/scores",
        data,
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken")
    );

    if (postScoreResponse.status == 201) {
        if (postScoreResponse.headers.get("access-token")) {
            localStorage.setItem(
                "accessToken",
                postScoreResponse.headers.get("access-token")
            );

            await postScore(data);
        } else {
            displayPopup(
                `Twój wynik: ${data.points}pkt, został dodany do listy najlepszych wyników !`,
                4
            );
        }
    } else {
        displayPopup(
            "Wystąpił błąd podczas dodawania punktów do listy najlepszych wyników.",
            4
        );
    }
}

async function getBestFiveScores() {
    // Loading of best scores.
    const getBestFiveScoresResponse = await getData(
        "https://Grzegorz96.pythonanywhere.com/scores?limit=5"
    );

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
