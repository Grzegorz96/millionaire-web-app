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
    changeTypeOfPasswordInput,
    changeSoundState,
    changeVolume,
    setupSounds,
    playSound,
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
import { mixer } from "./config.js";

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
window.playSound = playSound;

getQuestions();
checkSessionOfUser(true);
setNavbarButtons();
setupSounds();
mixer.currentSound.play();
