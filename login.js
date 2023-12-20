import {
    switchDisplay,
    toggleNavbarButtons,
    displayPopup,
} from "./generalFunctions.js";
import { elementsOfHtml, user } from "./config.js";
import { getData, postData } from "./requests.js";

function enterToLogin() {
    Array.from(elementsOfHtml.loginEntries).forEach((input) => {
        input.value = "";
    });
    switchDisplay(1);
}

async function login() {
    document.getElementById("login-button").disabled = true;

    const data = {
        login: elementsOfHtml.loginEntries[0].value,
        password: elementsOfHtml.loginEntries[1].value,
    };

    const loginResponse = await postData(
        "https://Grzegorz96.pythonanywhere.com/users/login",
        data
    );

    if (loginResponse.status == 200) {
        const accessToken = loginResponse.headers.get("access-token");
        const refreshToken = loginResponse.headers.get("refresh-token");
        const userId = (await loginResponse.json()).result;

        const getUserDataResponse = await getData(
            `https://Grzegorz96.pythonanywhere.com/users/${userId}`,
            accessToken,
            refreshToken
        );

        if (getUserDataResponse.status == 200) {
            user.userData = (await getUserDataResponse.json()).result[0];
            user.userId = user.userData.user_id;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            toggleNavbarButtons();
            switchDisplay(0);
        } else {
            displayPopup(
                "Wystąpił błąd podczas logowania, spróbuj ponownie później.",
                2
            );
        }
    } else if (loginResponse.status == 401) {
        displayPopup("Użytkownik o podanym loginie lub haśle nie istnieje!", 2);
    } else {
        displayPopup(
            "Wystąpił błąd podczas logowania, spróbuj ponownie później.",
            2
        );
    }
    document.getElementById("login-button").disabled = false;
}

function logout(message) {
    localStorage.clear();
    sessionStorage.setItem("logoutMessage", message);
    location.reload();
}

export { enterToLogin, login, logout };
