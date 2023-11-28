import { elementsOfHtml, game } from "./config.js";

function prepareGame() {
    if (game.questions) {
        loadGameContainer();
        inGame();
    } else {
        alert("Nie udało się pobrać pytań, spróbuj później.");
    }
}

function inGame() {
    drawQuestion();
    displayQuestion();
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
        "price-label-activated"
    );

    // Displaying number of current question.
    elementsOfHtml.questionNumber.innerText = `Pytanie: ${
        game.numberOfQuestion + 1
    }`;

    // Displaying content of current question.
    elementsOfHtml.questionContent.innerText = game.currentQuestion.content;

    // Displaying current answers.
    const abcdList = ["A", "B", "C", "D"];
    for (let i = 0; i < elementsOfHtml.answers.length; i++) {
        elementsOfHtml.answers[
            i
        ].innerHTML = `<b style="color:rgb(240, 236, 10);">${
            abcdList[i]
        }: </b>${game.currentQuestion[abcdList[i]]}`;
    }
}

async function checkAnswer(selectedButton, answer) {
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

        game.numberOfQuestion += 1;
        setDefaultValues(selectedButton, answer);
        if (game.numberOfQuestion == 11) {
            // endGame();
        }
        inGame();
    } else {
        let rightButton;
        for (let button of elementsOfHtml.answers) {
            if (button.classList.contains(game.currentQuestion.right_answer)) {
                rightButton = button;
            }
        }

        setSelectedAnswer(selectedButton, answer, "rgb(255, 30, 0)");
        setRightAnswer(rightButton);
        await awaitTimeout(4000);
        setDefaultValues(selectedButton, answer, rightButton);
        // endGame()
    }
}

function awaitTimeout(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

function endGame() {
    console.log("Tu bedzie funkcja końca gry");
}

function changeStanOfButtons(disabled) {
    Array.from(elementsOfHtml.answers).map((button) => {
        button.disabled = disabled;
    });

    Array.from(elementsOfHtml.gameBtns).map((button) => {
        button.disabled = disabled;
    });
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

function setDefaultValues(selectedButton, beforeVariable, rightButton = null) {
    Array.from(elementsOfHtml.priceLabels).map((label) => {
        label.classList.remove("price-label-activated");
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

    changeStanOfButtons(false);
}

function loadGameContainer() {
    for (let element of elementsOfHtml.loggedInBtns) {
        element.classList.remove("navbar-buttons-activated");
    }

    for (let element of elementsOfHtml.loggedOutBtns) {
        element.classList.remove("navbar-buttons-activated");
    }

    elementsOfHtml.containers[0].classList.toggle("main-container-activated");
    elementsOfHtml.containers[3].classList.toggle("main-container-activated");
    document.body.style.backgroundImage = "url(images/in-game.jpg)";
}

function switchDisplay(indexOfContainer) {
    for (let container of elementsOfHtml.containers) {
        container.classList.remove("main-container-activated");
    }
    elementsOfHtml.containers[indexOfContainer].classList.add(
        "main-container-activated"
    );
}

export { prepareGame, switchDisplay, checkAnswer };
