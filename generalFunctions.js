// Import of required modules.
import { elementsOfHtml, user, sounds, mixer } from "./config.js";
import { logout } from "./login.js";

// The function responsible for switching screens in the application.
function switchDisplay(indexOfContainer) {
    // Removal of the container--activated class from all application screens.
    for (let container of elementsOfHtml.containers) {
        container.classList.remove("container--activated");
    }

    // Removal of the popup--activated class from all popup elements.
    for (let popup of elementsOfHtml.popups) {
        popup.classList.remove("popup--activated");
    }

    // Adding the container--activated class to the currently displayed container.
    elementsOfHtml.containers[indexOfContainer].classList.add(
        "container--activated"
    );
}

// The function responsible for enabling appropriate navigation buttons depending on whether the user is logged in.
function setNavbarButtons() {
    // When the user is logged in, loggedInBtns get the activated class.
    if (
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
    ) {
        for (let element of elementsOfHtml.loggedInBtns) {
            element.classList.add("navbar-buttons--activated");
        }
        // Otherwise, loggedOutBtns get the activated class.
    } else {
        for (let element of elementsOfHtml.loggedOutBtns) {
            element.classList.add("navbar-buttons--activated");
        }
    }
}

// Function responsible for switching activated classes on navigation buttons.
function toggleNavbarButtons() {
    for (let element of elementsOfHtml.loggedInBtns) {
        element.classList.toggle("navbar-buttons--activated");
    }

    for (let element of elementsOfHtml.loggedOutBtns) {
        element.classList.toggle("navbar-buttons--activated");
    }
}

// Function responsible for displaying popups.
function displayPopup(text, indexOfPopup) {
    // Adding text to the p element of a given popup and then displaying it.
    elementsOfHtml.popups[indexOfPopup].children[1].innerText = text;
    elementsOfHtml.popups[indexOfPopup].classList.add("popup--activated");
}

// Function responsible for closing popups.
function closePopup(element) {
    // On the button's parent (popup element), removing the activated class.
    element.parentElement.classList.remove("popup--activated");
}

// Function responsible for reading the payload from the token jwt.
const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
        return null;
    }
};

// Function responsible for verifying the current user session.
function checkSessionOfUser(firstInit) {
    if (
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
    ) {
        // If the user has both tokens, i.e. is logged in, the program checks whether the user's refesh token is still valid and takes appropriate steps.
        const jwtRefreshToken = parseJwt(localStorage.getItem("refreshToken"));
        if (jwtRefreshToken) {
            if (Date.now() >= jwtRefreshToken.exp * 1000) {
                logout("Twoja sesja wygasła.");
            } else {
                // When the function is executed from the first initialization, i.e. from the program setup, the userId property will be assigned from the encoded userId in the user token.
                if (firstInit) user.userId = jwtRefreshToken.sub;
                return true;
            }
        } else {
            logout("Twoja sesja wygasła.");
        }
    } else {
        // If the user does not have tokens but this is a function call from the first initialization, he will not be logged out (because the user is not logged in).
        if (!firstInit) {
            logout("Twoja sesja wygasła.");
        }
    }
}

// Function responsible for changing the password input type, hiding the password.
function changeTypeOfPasswordInput(button, entryElement) {
    // Assigning an input element to a constant.
    const input = document.getElementById(entryElement);

    // If the current input type is password, we change it to text and change the icon on the button.
    if (input.type == "password") {
        input.type = "text";
        button.innerHTML = '<i class="fa-solid fa-eye"></i>';
        // Otherwise, we change the input type to password and change the button icon.
    } else {
        input.type = "password";
        button.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
}

// The function responsible for muting or unmuting the volume of sounds in the application.
function changeSoundState() {
    // When the current volume is greater than 0.
    if (elementsOfHtml.sliderVolume.value > 0) {
        // Assign the current volume to a mixer property to use this property when unmuting.
        mixer.previousVolume = elementsOfHtml.sliderVolume.value;
        // Assign the current volume to 0.
        elementsOfHtml.sliderVolume.value = 0;
        // Calling the volume change function.
        changeVolume();
    } else {
        // When the volume is 0, we assign it a value from the mixer propery and call volume change function.
        elementsOfHtml.sliderVolume.value = mixer.previousVolume;
        changeVolume();
    }
}

// Function responsible for changing the volume.
function changeVolume() {
    // If the current volume is greater than 0 and the soundButton has a second child, i.e. an icon with a slash, it will be removed.
    if (elementsOfHtml.sliderVolume.value > 0) {
        if (elementsOfHtml.soundButton.children[1]) {
            elementsOfHtml.soundButton.removeChild(
                elementsOfHtml.soundButton.children[1]
            );
        }
        // If the current volume is 0 and the soundButton does not have a second child, i.e. a slash icon, it will be added.
    } else {
        if (!elementsOfHtml.soundButton.children[1]) {
            const slash = document.createElement("i");
            slash.classList.add("fa-solid", "fa-slash");
            elementsOfHtml.soundButton.appendChild(slash);
        }
    }

    // Updating progressBar with current volume.
    elementsOfHtml.progressBar.value = elementsOfHtml.sliderVolume.value;

    // Update each sound in the program with the current volume.
    for (let sound in sounds) {
        sounds[sound].volume = elementsOfHtml.sliderVolume.value / 100;
    }
}

// Program sounds setup called when the application starts.
function setupSounds() {
    // First update of the progressBar element.
    elementsOfHtml.progressBar.value = elementsOfHtml.sliderVolume.value;

    // First update of sounds in the program.
    for (let sound in sounds) {
        sounds[sound].volume = elementsOfHtml.sliderVolume.value / 100;
    }

    // Setting 2 sound objects to be performed in a loop.
    sounds.mainTheme.loop = true;
    sounds.questionTheme.loop = true;

    // Sound queuing function.
    const soundQueue = (sound) => {
        mixer.currentSound = sounds[sound];
        mixer.currentSound.play();
    };

    // Setting on 3 sound objects, an onended event, which, when a given sound ends, will trigger the next queued sound.
    sounds.startQuestion.onended = () => soundQueue("questionTheme");
    sounds.startSoundtrack.onended = () => soundQueue("mainTheme");
    sounds.millioner.onended = () => soundQueue("mainTheme");
}

// Sound playing function. The currentSound will be paused and rewound to the beginning, then the currentSound will be overwritten by the new one and played.
function playSound(sound) {
    mixer.currentSound.pause();
    mixer.currentSound.currentTime = 0;
    mixer.currentSound = sounds[sound];
    mixer.currentSound.play();
}

// Function responsible for playing the fiftyFiftySound effect
function playFiftyFiftySoundEffect() {
    sounds.fiftyFifty.pause();
    sounds.fiftyFifty.currentTime = 0;
    sounds.fiftyFifty.play();
}

// Function responsible for entering the application.
function enterApp() {
    document.getElementById("enter-app").style.display = "none";
    document.querySelector("header").style.display = "block";
    document.querySelector("main").style.display = "block";
    document.querySelector("footer").style.display = "block";
    mixer.currentSound.play();
}

// Function responsible for displaying the message attached when the user logs out.
function displayLogoutMessage() {
    // In case the user has been logged out and there is a logoutMessage key in session storage in his browser.
    if (sessionStorage.getItem("logoutMessage")) {
        displayPopup(sessionStorage.getItem("logoutMessage"), 0);
        sessionStorage.removeItem("logoutMessage");
    }
}

// export functions.
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
