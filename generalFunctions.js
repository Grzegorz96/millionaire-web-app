import { elementsOfHtml, user, sounds, mixer } from "./config.js"; // Objects of application.
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
                logout("Twoja sesja wygasła.");
            } else {
                if (firstInit) user.userId = jwtRefreshToken.sub;
                return true;
            }
        } else {
            logout("Twoja sesja wygasła.");
        }
    } else {
        if (!firstInit) {
            logout("Twoja sesja wygasła.");
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

function changeSoundState() {
    if (elementsOfHtml.sliderVolume.value > 0) {
        mixer.previousVolume = elementsOfHtml.sliderVolume.value;
        elementsOfHtml.sliderVolume.value = 0;
        changeVolume();
    } else {
        elementsOfHtml.sliderVolume.value = mixer.previousVolume;
        changeVolume();
    }
}

function changeVolume() {
    if (elementsOfHtml.sliderVolume.value > 0) {
        if (
            elementsOfHtml.soundButton.innerHTML.includes(
                '<i class="fa-solid fa-slash"></i>'
            )
        )
            elementsOfHtml.soundButton.innerHTML =
                '<i class="fa-solid fa-volume-high"></i>';
    } else {
        if (
            !elementsOfHtml.soundButton.innerHTML.includes(
                '<i class="fa-solid fa-slash"></i>'
            )
        )
            elementsOfHtml.soundButton.innerHTML =
                '<i class="fa-solid fa-volume-high"></i><i class="fa-solid fa-slash"></i>';
    }

    elementsOfHtml.progressBar.value = elementsOfHtml.sliderVolume.value;

    for (let sound in sounds) {
        sounds[sound].volume = elementsOfHtml.sliderVolume.value / 100;
    }
}

function setupSounds() {
    elementsOfHtml.progressBar.value = elementsOfHtml.sliderVolume.value;

    for (let sound in sounds) {
        sounds[sound].volume = elementsOfHtml.sliderVolume.value / 100;
    }

    sounds.mainTheme.loop = true;
    sounds.questionTheme.loop = true;

    sounds.startQuestion.onended = () => {
        mixer.currentSound = sounds.questionTheme;
        mixer.currentSound.play();
    };

    sounds.startSoundtrack.onended = () => {
        mixer.currentSound = sounds.mainTheme;
        mixer.currentSound.play();
    };

    sounds.millioner.onended = () => {
        mixer.currentSound = sounds.mainTheme;
        mixer.currentSound.play();
    };
}

function playSound(sound) {
    mixer.currentSound.pause();
    mixer.currentSound.currentTime = 0;
    mixer.currentSound = sounds[sound];
    mixer.currentSound.play();
}

function playFiftyFiftySoundEffect() {
    sounds.fiftyFifty.pause();
    sounds.fiftyFifty.currentTime = 0;
    sounds.fiftyFifty.play();
}

function enterApp() {
    document.getElementById("enter-app").style.display = "none";
    mixer.currentSound.play();
}

function displayLogoutMessage() {
    if (sessionStorage.getItem("message")) {
        displayPopup(sessionStorage.getItem("message"), 0);
        sessionStorage.removeItem("message");
    }
}

export {
    switchDisplay,
    setNavbarButtons,
    toggleNavbarButtons,
    closePopup,
    displayPopup,
    checkSessionOfUser,
    changeTypeOfPasswordInput,
    changeSoundState,
    changeVolume,
    setupSounds,
    playSound,
    playFiftyFiftySoundEffect,
    enterApp,
    displayLogoutMessage,
};
