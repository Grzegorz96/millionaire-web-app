const user = {
    isUserLoggedIn: false,
};

const game = {
    numberOfQuestion: 0,
    questions: undefined,
    currentQuestions: undefined,
};

const elementsOfHtml = {
    containers: document.querySelector("main").children,
    loggedInBtns: document.getElementsByClassName("logged-in"),
    loggedOutBtns: document.getElementsByClassName("logged-out"),
    priceLabels: document.getElementsByClassName("price-label"),
    questionNumber: document.getElementById("question-number-mid"),
    questionContent: document.getElementById("question-content-mid"),
    answers: document.getElementsByClassName("mid"),
};

export { elementsOfHtml, game, user };
