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

const sounds = {
    checkinQuestion: new Audio("sounds/checking_question_mp3.mp3"),
    fiftyFifty: new Audio("sounds/fifty_fifty_wav.wav"),
    mainTheme: new Audio("sounds/main_theme_mp3.mp3"),
    millioner: new Audio("sounds/millioner_mp3.mp3"),
    questionTheme: new Audio("sounds/question_theme_mp3.mp3"),
    startQuestion: new Audio("sounds/start_question_mp3.mp3"),
    startSoundrack: new Audio("sounds/start_soundtrack_mp3.mp3"),
    win: new Audio("sounds/win_mp3.mp3"),
    fail: new Audio("sounds/fail_mp3.mp3"),
    volume: 1,
    turnON: true,
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
    progressBar: document.getElementById("progress"),
    sliderValue: document.getElementById("slider-value"),
};

export { elementsOfHtml, game, user, sounds };
