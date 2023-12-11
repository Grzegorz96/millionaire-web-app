import { elementsOfHtml } from "./config.js"; // Objects of application.

function switchDisplay(indexOfContainer) {
    for (let container of elementsOfHtml.containers) {
        container.classList.remove("main-container-activated");
    }
    elementsOfHtml.containers[indexOfContainer].classList.add(
        "main-container-activated"
    );
}

function setNavbarButtons() {
    // Checking if user is logged in.
    if (
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
    ) {
        for (let element of elementsOfHtml.loggedInBtns) {
            element.classList.add("navbar-buttons-activated");
        }
    } else {
        for (let element of elementsOfHtml.loggedOutBtns) {
            element.classList.add("navbar-buttons-activated");
        }
    }
}

function toggleNavbarButtons() {
    for (let element of elementsOfHtml.loggedInBtns) {
        element.classList.toggle("navbar-buttons-activated");
    }

    for (let element of elementsOfHtml.loggedOutBtns) {
        element.classList.toggle("navbar-buttons-activated");
    }
}

function loginPopup(text) {
    const loginPopup = document.querySelector(".login-popup");

    loginPopup.children[1].innerText = text;

    loginPopup.classList.add("active-popup");
}

function closePopup(element) {
    element.parentElement.classList.remove("active-popup");
}
export {
    switchDisplay,
    setNavbarButtons,
    toggleNavbarButtons,
    closePopup,
    loginPopup,
};
