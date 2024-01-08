// Import of required modules.
import {
    prepareGame,
    checkAnswer,
    endGame,
    loadMainContainer,
    fiftyFifty,
    getQuestions,
} from "./game.js";
import {
    switchDisplay,
    setNavbarButtons,
    closePopup,
    checkSessionOfUser,
    changeTypeOfPasswordInput,
    changeSoundState,
    changeVolume,
    setupSounds,
    enterApp,
    displayLogoutMessage,
} from "./generalFunctions.js";
import { enterToLogin, login, logout } from "./login.js";
import { enterToRegister, register, checkPassword } from "./register.js";
import { getBestScores } from "./bestScores.js";
import {
    enterToUserPanel,
    checkUserData,
    updateUser,
    deleteUser,
} from "./userPanel.js";
import { enterToAddQuestionPanel, sendQuestion } from "./addQuestions.js";
import { disableDropdownMenu } from "./dropDownMenu.js";

// Assigning the required functions as methods on the window object. Creating global functions that are accessible from index.html
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
window.getBestScores = getBestScores;
window.enterToUserPanel = enterToUserPanel;
window.updateUser = updateUser;
window.deleteUser = deleteUser;
window.checkUserData = checkUserData;
window.enterToAddQuestionPanel = enterToAddQuestionPanel;
window.sendQuestion = sendQuestion;
window.changeTypeOfPasswordInput = changeTypeOfPasswordInput;
window.changeSoundState = changeSoundState;
window.changeVolume = changeVolume;
window.enterApp = enterApp;
window.onresize = disableDropdownMenu;

// Performing the application setup procedure.
displayLogoutMessage();
getQuestions();
setupSounds();
checkSessionOfUser(true);
setNavbarButtons();
