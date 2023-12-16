import { elementsOfHtml, game, user } from "./config.js";
import { getData, postData } from "./requests.js"; // CRUD functions on database.
import {
    switchDisplay,
    setNavbarButtons,
    displayPopup,
} from "./generalFunctions.js";

function prepareGame() {
    if (game.questions) {
        loadGameContainer();
        getBestFiveScores();
        game.startTime = new Date();
        inGame();
    } else {
        displayPopup(
            "Wystąpił błąd podczas pobierania pytań, spróbuj ponownie później.",
            0
        );
    }
}

function inGame() {
    drawQuestion();
    displayQuestion();
    changeStanOfButtons(false);
}

function drawQuestion() {
    const actualLevelOfQuestions = [];

    while (!actualLevelOfQuestions.length) {
        for (let question of game.currentQuestions) {
            if (question.difficulty == game.numberOfQuestion) {
                actualLevelOfQuestions.push(question);
            }
        }

        if (!actualLevelOfQuestions.length) {
            game.currentQuestions = [...game.questions]; // if we use every question from particular difficuly level we need to refresh our current list.
        }
    }

    const question =
        actualLevelOfQuestions[
            Math.floor(Math.random() * actualLevelOfQuestions.length) // Drawing index of question.
        ];

    game.currentQuestions.splice(game.currentQuestions.indexOf(question), 1); // Removing question from currenQuestions.

    game.currentQuestion = question;
}

function displayQuestion() {
    // highlighting the current div with the amount to be won.
    elementsOfHtml.priceLabels[game.numberOfQuestion].classList.add(
        "price-label--activated"
    );

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

async function checkAnswer(selectedButton) {
    const answer = selectedButton.classList[1];

    changeStanOfButtons(true);
    setSelectedAnswer(selectedButton, answer, "rgb(199, 125, 14)");
    await awaitTimeout(4500);

    if (game.currentQuestion.right_answer == answer) {
        setSelectedAnswer(selectedButton, answer, "rgb(5, 255, 13)");
        await awaitTimeout(4500);

        if (game.numberOfQuestion == 1) {
            game.priceQuaranteed = 1000;
        } else if (game.numberOfQuestion == 7) {
            game.priceQuaranteed = 40000;
        } else if (game.numberOfQuestion == 11) {
            game.priceQuaranteed = 1000000;
        }
        game.currentWon = Number(
            elementsOfHtml.priceLabels[game.numberOfQuestion].innerText.slice(
                0,
                -2
            )
        );

        setDefaultValues(selectedButton, answer);
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
        await awaitTimeout(4000);
        setDefaultValues(selectedButton, answer, rightButton);
        endGame(false);
    }
}

function awaitTimeout(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

function endGame(isFrombutton) {
    const gameDuration = (new Date() - game.startTime) / 1000; // time of game duration in seconds.

    if (isFrombutton) {
        var amountWon = game.currentWon;
        Array.from(elementsOfHtml.priceLabels).map((label) => {
            label.classList.remove("price-label--activated");
        });
        changeStanOfButtons(true);
    } else {
        var amountWon = game.priceQuaranteed;
    }

    game.isFiftyFiftyAvailable = true;
    elementsOfHtml.gameBtns[0].style.backgroundColor = "rgb(24, 28, 46)";
    game.numberOfQuestion = 0;
    game.currentQuestion = undefined;
    game.priceQuaranteed = 0;
    game.currentWon = 0;
    game.startTime = undefined;
    elementsOfHtml.questionNumber.innerText = "";
    elementsOfHtml.questionContent.innerText = "";
    Array.from(elementsOfHtml.answers).map((button) => {
        button.innerHTML = "";
    });

    const result = Math.floor(amountWon / gameDuration);
    loadEndGameContainer(amountWon, result);
}

function changeStanOfButtons(disabled) {
    Array.from(elementsOfHtml.answers).map((button) => {
        button.disabled = disabled;
    });

    if (game.isFiftyFiftyAvailable) {
        Array.from(elementsOfHtml.gameBtns).map((button) => {
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
    if (!selectedButton.classList.contains("selected-answer")) {
        selectedButton.classList.add("selected-answer");
        selectedButton.children[0].style.color = "white";
    }

    document
        .querySelector(":root")
        .style.setProperty(`--${beforeVariable}`, currentColor);

    document
        .querySelector(":root")
        .style.setProperty(`--selected-answer-background`, currentColor);
}

function setDefaultValues(selectedButton, beforeVariable, rightButton) {
    Array.from(elementsOfHtml.priceLabels).map((label) => {
        label.classList.remove("price-label--activated");
    });

    document
        .querySelector(":root")
        .style.setProperty(`--${beforeVariable}`, "rgb(24, 28, 46)");

    document
        .querySelector(":root")
        .style.setProperty(`--selected-answer-background`, "none");

    selectedButton.classList.remove("selected-answer");

    if (rightButton) {
        document
            .querySelector(":root")
            .style.setProperty(
                `--${game.currentQuestion.right_answer}`,
                "rgb(24, 28, 46)"
            );

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
    document.body.style.backgroundImage = "url(images/in-game.jpg)";
    switchDisplay(4);
}

function loadMainContainer() {
    elementsOfHtml.amountAndResult[0].innerText = "";
    elementsOfHtml.amountAndResult[1].innerText = "";
    // W tym miejscu sprawdzać czy sesja dalej trwa i albo przelaczyc ekran na główny albo wylogować
    setNavbarButtons();
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

    document.body.style.backgroundImage = "url(images/background.png)";
    switchDisplay(5);
}

function fiftyFifty() {
    game.isFiftyFiftyAvailable = false;
    elementsOfHtml.gameBtns[0].disabled = true;
    elementsOfHtml.gameBtns[0].style.backgroundColor = "#4d0004";

    const badAnswers = ["A", "B", "C", "D"].filter(
        (answer) => answer != game.currentQuestion.right_answer
    );

    badAnswers.splice(Math.floor(Math.random() * badAnswers.length), 1);

    Array.from(elementsOfHtml.answers).map((button) => {
        if (badAnswers.includes(button.classList[1])) {
            button.innerHTML = "";
            button.disabled = true;
        }
    });
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
                3
            );
        }
    } else {
        displayPopup(
            "Wystąpił błąd podczas dodawania punktów do listy najlepszych wyników.",
            3
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

export {
    prepareGame,
    checkAnswer,
    endGame,
    loadMainContainer,
    fiftyFifty,
    getQuestions,
};
