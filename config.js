const user = { userData: undefined, userId: undefined };

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
    loginEntries: document.getElementsByClassName("login-input"),
    registerEntries: document.getElementsByClassName("register-input"),
    userPanelEntries: document.getElementsByClassName("user-data-input"),
    userPanelBtns: document.getElementsByClassName("user-button"),
    authorizationEntry: document.getElementById("authorization-account"),
    popups: document.getElementsByClassName("popup"),
    addQuestionEntries: document.getElementsByClassName("add-question-input"),
};

export { elementsOfHtml, game, user };
