import { getData, postData, updateData, deleteData } from "./requests.js"; // CRUD functions on database.
import { elementsOfHtml, game, user } from "./config.js"; // Objects of application.
import {
    prepareGame,
    checkAnswer,
    endGame,
    loadMainContainer,
    fiftyFifty,
} from "./game.js"; // Functions of game.
import { switchDisplay } from "./generalFunctions.js";
import { backFromLogin } from "./login.js";
import { backFromRegister } from "./register.js";

window.switchDisplay = switchDisplay;
window.prepareGame = prepareGame;
window.checkAnswer = checkAnswer;
window.endGame = endGame;
window.loadMainContainer = loadMainContainer;
window.fiftyFifty = fiftyFifty;
window.backFromLogin = backFromLogin;
window.backFromRegister = backFromRegister;

// Checking if user is logged in.
if (!user.isUserLoggedIn) {
    for (let element of elementsOfHtml.loggedOutBtns) {
        element.classList.add("navbar-buttons-activated");
    }
} else {
    for (let element of elementsOfHtml.loggedInBtns) {
        element.classList.add("navbar-buttons-activated");
    }
}

// Loading of questions.
getData("https://Grzegorz96.pythonanywhere.com/questions").then((response) => {
    if (response) {
        game.questions = response.result; // basic version of questions
        game.currentQuestions = [...game.questions]; // version of questions to modify
    }
});
