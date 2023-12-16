import { elementsOfHtml, user, sounds } from "./config.js"; // Objects of application.
import { logout } from "./login.js";

function switchDisplay(indexOfContainer) {
    for (let container of elementsOfHtml.containers) {
        container.classList.remove("container--activated");
    }

    for (let popup of elementsOfHtml.popups) {
        popup.classList.remove("popup--activated");
    }

    elementsOfHtml.containers[indexOfContainer].classList.add(
        "container--activated"
    );
}

function setNavbarButtons() {
    // Checking if user is logged in.
    if (
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
    ) {
        for (let element of elementsOfHtml.loggedInBtns) {
            element.classList.add("navbar-buttons--activated");
        }
    } else {
        for (let element of elementsOfHtml.loggedOutBtns) {
            element.classList.add("navbar-buttons--activated");
        }
    }
}

function toggleNavbarButtons() {
    for (let element of elementsOfHtml.loggedInBtns) {
        element.classList.toggle("navbar-buttons--activated");
    }

    for (let element of elementsOfHtml.loggedOutBtns) {
        element.classList.toggle("navbar-buttons--activated");
    }
}

function displayPopup(text, indexOfPopup) {
    elementsOfHtml.popups[indexOfPopup].children[1].innerText = text;
    elementsOfHtml.popups[indexOfPopup].classList.add("popup--activated");
}

function closePopup(element) {
    element.parentElement.classList.remove("popup--activated");
}

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
        return null;
    }
};

function checkSessionOfUser(firstInit) {
    if (
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
    ) {
        const jwtRefreshToken = parseJwt(localStorage.getItem("refreshToken"));
        if (jwtRefreshToken) {
            if (Date.now() >= jwtRefreshToken.exp * 1000) {
                logout();
            } else {
                if (firstInit) user.userId = jwtRefreshToken.sub;
                return true;
            }
        } else {
            logout();
        }
    } else {
        if (!firstInit) {
            logout();
        }
    }
}

function changeTypeOfPasswordInput(button, entryElement) {
    const input = document.getElementById(entryElement);

    if (input.type == "password") {
        input.type = "text";
        button.innerHTML = '<i class="fa-solid fa-eye"></i>';
    } else {
        input.type = "password";
        button.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
}

function turnOfSounds(soundButton) {
    if (sounds.turnON) {
        sounds.turnON = false;
        soundButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    } else {
        sounds.turnON = true;
        soundButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
}

function changeVolume(slider) {
    elementsOfHtml.progressBar.value = slider.value;
    elementsOfHtml.sliderValue.innerText = slider.value;
}

export {
    switchDisplay,
    setNavbarButtons,
    toggleNavbarButtons,
    closePopup,
    displayPopup,
    checkSessionOfUser,
    changeTypeOfPasswordInput,
    turnOfSounds,
    changeVolume,
};
