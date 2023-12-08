import { getData, postData, updateData, deleteData } from "./requests.js"; // CRUD functions on database.
import { elementsOfHtml, game, user } from "./config.js"; // Objects of application.
import {
    prepareGame,
    checkAnswer,
    endGame,
    loadMainContainer,
    fiftyFifty,
} from "./game.js"; // Functions of game.
import {
    switchDisplay,
    setNavbarButtons,
    closePopup,
    parseJwt,
} from "./generalFunctions.js";
import { backFromLogin, login, logout } from "./login.js";
import { backFromRegister, register } from "./register.js";

window.switchDisplay = switchDisplay;
window.prepareGame = prepareGame;
window.checkAnswer = checkAnswer;
window.endGame = endGame;
window.loadMainContainer = loadMainContainer;
window.fiftyFifty = fiftyFifty;
window.backFromLogin = backFromLogin;
window.backFromRegister = backFromRegister;
window.login = login;
window.logout = logout;
window.register = register;
window.closePopup = closePopup;

// Loading of questions.
async function getQuestions() {
    const response = await getData(
        "https://Grzegorz96.pythonanywhere.com/questions"
    );

    if (response.status == 200) {
        game.questions = (await response.json()).result; // basic version of questions
        game.currentQuestions = [...game.questions]; // version of questions to modify
    }
}

getQuestions();
// getLoggedInUserInfo();
setNavbarButtons();

if (
    localStorage.getItem("accessToken") &&
    localStorage.getItem("refreshToken")
) {
    const jwtRefreshToken = parseJwt(localStorage.getItem("refreshToken"));
    if (jwtRefreshToken) {
        if (Date.now() >= jwtRefreshToken.exp * 1000) {
            logout();
        }
    } else {
        logout();
    }
}
