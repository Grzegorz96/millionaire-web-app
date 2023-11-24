import * as requestsModule from "./requests.js";
import * as configModule from "./config.js";
import * as gameModule from "./game.js";
window.switchDisplay = gameModule.switchDisplay;
window.prepareGame = gameModule.prepareGame;

if (!configModule.isUserLoggedIn) {
    for (let element of configModule.loggedOutBtns) {
        element.classList.toggle("navbar-buttons-activated");
    }
} else {
    for (let element of configModule.loggedInBtns) {
        element.classList.toggle("navbar-buttons-activated");
    }
}

let questions;
let loadingQuestions = true;

requestsModule
    .getData("https://Grzegorz96.pythonanywhere.com/questions")
    .then((response) => {
        if (response instanceof Error) {
            console.log("błąd");
        } else {
            loadingQuestions = false;
            questions = response.result;
        }
    });
