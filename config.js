// User object.
const user = { userData: undefined, userId: undefined };

// Game object.
const game = {
    isFiftyFiftyAvailable: true,
    startTime: undefined,
    questions: undefined,
    currentQuestions: undefined,
    currentQuestion: undefined,
    bestFivePlayers: undefined,
    numberOfQuestion: 0,
    priceGuaranteed: 0,
    currentWon: 0,
    listOfAmounts: [
        500, 1000, 2000, 5000, 10000, 20000, 40000, 75000, 125000, 250000,
        500000, 1000000,
    ],
};

// Sounds object.
const sounds = {
    checkingQuestion: new Audio("sounds/checking_question_mp3.mp3"),
    fiftyFifty: new Audio("sounds/fifty_fifty_wav.wav"),
    mainTheme: new Audio("sounds/main_theme_mp3.mp3"),
    millioner: new Audio("sounds/millioner_mp3.mp3"),
    questionTheme: new Audio("sounds/question_theme_mp3.mp3"),
    startQuestion: new Audio("sounds/start_question_mp3.mp3"),
    startSoundtrack: new Audio("sounds/start_soundtrack_mp3.mp3"),
    win: new Audio("sounds/win_mp3.mp3"),
    fail: new Audio("sounds/fail_mp3.mp3"),
};

// HTML elements object.
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
    soundButton: document.getElementById("sound-button"),
    sliderVolume: document.getElementById("volume"),
    progressBar: document.getElementById("progress"),
    toggleBtn: document.querySelector(".navbar__toggle-btn"),
    toggleBtnIcon: document.querySelector(".navbar__toggle-btn i"),
    dropDownMenu: document.querySelector(".dropdown-menu"),
    dropDownMenuIsOpen: false,
};

// Sound mixer object.
const mixer = {
    currentSound: sounds.startSoundtrack,
    previousVolume: elementsOfHtml.sliderVolume.value,
};

// Objects export.
export { elementsOfHtml, game, user, sounds, mixer };
