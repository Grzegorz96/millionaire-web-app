import { getData, postData, updateData, deleteData } from "./requests.js"; // CRUD functions on database.
import { elementsOfHtml, game, user } from "./config.js"; // Objects of application.
import { switchDisplay, prepareGame } from "./game.js"; // Functions of game.

window.switchDisplay = switchDisplay;
window.prepareGame = prepareGame;

// Checking if user is logged in.
if (!user.isUserLoggedIn) {
    for (let element of elementsOfHtml.loggedOutBtns) {
        element.classList.toggle("navbar-buttons-activated");
    }
} else {
    for (let element of elementsOfHtml.loggedInBtns) {
        element.classList.toggle("navbar-buttons-activated");
    }
}

// Loading of questions.
getData("https://Grzegorz96.pythonanywhere.com/questions").then((response) => {
    if (response) {
        game.questions = response.result; // basic version of questions
        game.currentQuestions = [...game.questions]; // version of questions to modify
    }
});
