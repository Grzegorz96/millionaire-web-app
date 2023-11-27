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
    const question = drawQuestion();
    displayQuestion(question);
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

    return question;
}

function displayQuestion(question) {
    // highlighting the current div with the amount to be won.
    elementsOfHtml.priceLabels[game.numberOfQuestion].classList.add(
        "price-label-activated"
    );

    // Displaying number of current question.
    elementsOfHtml.questionNumber.innerText = `Pytanie: ${
        game.numberOfQuestion + 1
    }`;

    // Displaying content of current question.
    elementsOfHtml.questionContent.innerText = question.content;

    // Displaying current answers.
    const abcdList = ["A", "B", "C", "D"];
    for (let i = 0; i < elementsOfHtml.answers.length; i++) {
        elementsOfHtml.answers[
            i
        ].innerHTML = `<b style="color:rgb(240, 236, 10);">${
            abcdList[i]
        }: </b>${question[abcdList[i]]}`;
    }
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

export { prepareGame, switchDisplay };
