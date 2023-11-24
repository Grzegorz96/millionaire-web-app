import { loggedInBtns, loggedOutBtns, containers } from "./config.js";

function prepareGame() {
    for (let element of loggedInBtns) {
        element.classList.remove("navbar-buttons-activated");
    }

    for (let element of loggedOutBtns) {
        element.classList.remove("navbar-buttons-activated");
    }

    containers[0].classList.toggle("main-container-activated");
    containers[3].classList.toggle("main-container-activated");
    document.body.style.backgroundImage = "url(images/in-game.jpg)";
}

function switchDisplay(indexOfContainer) {
    for (let container of containers) {
        container.classList.remove("main-container-activated");
    }
    containers[indexOfContainer].classList.add("main-container-activated");
}

export { prepareGame, switchDisplay };
