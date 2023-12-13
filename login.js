import {
    switchDisplay,
    toggleNavbarButtons,
    displayPopup,
} from "./generalFunctions.js";
import { elementsOfHtml, user } from "./config.js";
import { getData, postData } from "./requests.js";

function backFromLogin() {
    Array.from(elementsOfHtml.loginEntries).map((input) => {
        input.value = "";
    });
    switchDisplay(0);
}

async function login() {
    document.getElementById("login-button").disabled = true;
    const login = elementsOfHtml.loginEntries[0].value;
    const password = elementsOfHtml.loginEntries[1].value;

    const loginResponse = await postData(
        "https://Grzegorz96.pythonanywhere.com/users/login",
        {
            login: login,
            password: password,
        }
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
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            toggleNavbarButtons();
            backFromLogin();
        } else {
            displayPopup(
                "Wystąpił błąd podczas logowania, spróbuj ponownie później.",
                1
            );
        }
    } else if (loginResponse.status == 401) {
        displayPopup("Użytkownik o podanym loginie lub haśle nie istnieje!", 1);
    } else {
        displayPopup(
            "Wystąpił błąd podczas logowania, spróbuj ponownie później.",
            1
        );
    }
    document.getElementById("login-button").disabled = false;
}

function logout() {
    localStorage.clear();
    location.reload();
}

export { backFromLogin, login, logout };
