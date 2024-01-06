// Import of required modules.
import {
    switchDisplay,
    toggleNavbarButtons,
    displayPopup,
} from "./generalFunctions.js";
import { elementsOfHtml, user } from "./config.js";
import { getData, postData } from "./requests.js";

// Function responsible for launching the login panel.
function enterToLogin(fromDropDownMenu) {
    // If launched from the dropdown menu, the toggle button will be auto-clicked.
    if (fromDropDownMenu) elementsOfHtml.toggleBtn.click();

    // Clearing inputs in the panel.
    Array.from(elementsOfHtml.loginEntries).forEach((input) => {
        input.value = "";
    });
    // Change the screen to the screen with the login panel.
    switchDisplay(1);
}

// Function responsible for user login.
async function login() {
    // Disabling the login button.
    document.getElementById("login-button").disabled = true;

    // Creating a json object from validated user data.
    const data = {
        login: elementsOfHtml.loginEntries[0].value,
        password: elementsOfHtml.loginEntries[1].value,
    };

    // Sending a request for JWT tokens and user id.
    const loginResponse = await postData(
        "https://Grzegorz96.pythonanywhere.com/users/login",
        data
    );

    // Case of receiving status 200.
    if (loginResponse.status == 200) {
        // Getting tokens and user id into variables.
        const accessToken = loginResponse.headers.get("access-token");
        const refreshToken = loginResponse.headers.get("refresh-token");
        const userId = (await loginResponse.json()).result;

        // Sending a request for the logged in user's data.
        const getUserDataResponse = await getData(
            `https://Grzegorz96.pythonanywhere.com/users/${userId}`,
            accessToken,
            refreshToken
        );

        // Case of receiving status 200.
        if (getUserDataResponse.status == 200) {
            // Assigning the retrieved data to the userData property.
            user.userData = (await getUserDataResponse.json()).result[0];
            // Assigning the userid to the userId property.
            user.userId = user.userData.user_id;
            // Assignment of jwt tokens in the browser's local memory. This will allow user sessions.
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            // Toggle navigation buttons corresponding to logged in user.
            toggleNavbarButtons();
            // Change the screen to the screen with the login panel.
            switchDisplay(0);
            // If you receive a status other than 200, display an error message.
        } else {
            displayPopup(
                "Wystąpił błąd podczas logowania, spróbuj ponownie później.",
                2
            );
        }
        // If you receive status 401 when logging in, display a message that the specified user does not exist.
    } else if (loginResponse.status == 401) {
        displayPopup("Użytkownik o podanym loginie lub haśle nie istnieje!", 2);
        // If you receive a status other than 200 or 401, display an error message.
    } else {
        displayPopup(
            "Wystąpił błąd podczas logowania, spróbuj ponownie później.",
            2
        );
    }
    // Enabling the login button.
    document.getElementById("login-button").disabled = false;
}

// Function responsible for logging out the user.
function logout(message) {
    // Clearing browser local memory (removing jwt token).
    localStorage.clear();
    // Show logout message after page reload by setting logoutMessage in session memory.
    sessionStorage.setItem("logoutMessage", message);
    // Page reload.
    location.reload();
}

// export functions.
export { enterToLogin, login, logout };
