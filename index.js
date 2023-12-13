import {
    prepareGame,
    checkAnswer,
    endGame,
    loadMainContainer,
    fiftyFifty,
    getQuestions,
} from "./game.js"; // Functions of game.
import {
    switchDisplay,
    setNavbarButtons,
    closePopup,
    checkSessionOfUser,
} from "./generalFunctions.js";
import { backFromLogin, login, logout } from "./login.js";
import { backFromRegister, register, checkPassword } from "./register.js";
import { bestScores } from "./bestScores.js";
import { updateUser, backFromUserPanel, userPanel } from "./userPanel.js";

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
window.checkPassword = checkPassword;
window.bestScores = bestScores;
window.updateUser = updateUser;
window.backFromUserPanel = backFromUserPanel;
window.userPanel = userPanel;

getQuestions();
setNavbarButtons();
checkSessionOfUser(true);
