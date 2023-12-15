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
import { enterToLogin, login, logout } from "./login.js";
import { enterToRegister, register, checkPassword } from "./register.js";
import { bestScores } from "./bestScores.js";
import {
    enterToUserPanel,
    changeTypeOfPasswordInput,
    checkUserData,
    updateUser,
    deleteUser,
} from "./userPanel.js";
import { enterToAddQuestionPanel, sendQuestion } from "./addQuestions.js";

window.switchDisplay = switchDisplay;
window.prepareGame = prepareGame;
window.checkAnswer = checkAnswer;
window.endGame = endGame;
window.loadMainContainer = loadMainContainer;
window.fiftyFifty = fiftyFifty;
window.enterToLogin = enterToLogin;
window.enterToRegister = enterToRegister;
window.login = login;
window.logout = logout;
window.register = register;
window.closePopup = closePopup;
window.checkPassword = checkPassword;
window.bestScores = bestScores;
window.enterToUserPanel = enterToUserPanel;
window.updateUser = updateUser;
window.deleteUser = deleteUser;
window.checkUserData = checkUserData;
window.enterToAddQuestionPanel = enterToAddQuestionPanel;
window.sendQuestion = sendQuestion;
window.changeTypeOfPasswordInput = changeTypeOfPasswordInput;

getQuestions();
checkSessionOfUser(true);
setNavbarButtons();
