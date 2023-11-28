const user = {
    isUserLoggedIn: false,
};

const game = {
    numberOfQuestion: 0,
    questions: undefined,
    currentQuestions: undefined,
    currentQuestion: undefined,
    priceQuaranteed: 0,
    currentWon: 0,
};

const elementsOfHtml = {
    containers: document.querySelector("main").children,
    loggedInBtns: document.getElementsByClassName("logged-in"),
    loggedOutBtns: document.getElementsByClassName("logged-out"),
    priceLabels: document.getElementsByClassName("price-label"),
    questionNumber: document.getElementById("question-number-mid"),
    questionContent: document.getElementById("question-content-mid"),
    answers: document.getElementsByClassName("mid"),
    gameBtns: document.getElementById("game-buttons").children,
};

export { elementsOfHtml, game, user };
