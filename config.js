const user = { userData: undefined };

const game = {
    isFiftyFiftyAvailable: true,
    startTime: undefined,
    questions: undefined,
    currentQuestions: undefined,
    currentQuestion: undefined,
    bestFivePlayers: undefined,
    numberOfQuestion: 0,
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
    amountAndResult: document.getElementById("amount-and-result").children,
    resultlabels: document.getElementsByClassName("results"),
    loginEntries: Array.from(document.getElementsByTagName("input")).slice(
        0,
        2
    ),
    registerEntries: Array.from(document.getElementsByTagName("input")).slice(
        2,
        8
    ),
};

export { elementsOfHtml, game, user };
