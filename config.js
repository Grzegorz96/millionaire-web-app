let numberOfQuestion = 0;
let isUserLoggedIn = false;
const containers = document.querySelector("main").children;
const loggedInBtns = document.getElementsByClassName("logged-in");
const loggedOutBtns = document.getElementsByClassName("logged-out");
const mainContainerButtons = document.getElementsByClassName(
    "main-container__button"
);

export {
    numberOfQuestion,
    isUserLoggedIn,
    containers,
    loggedInBtns,
    loggedOutBtns,
    mainContainerButtons,
};
