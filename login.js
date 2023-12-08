import { switchDisplay } from "./generalFunctions.js";
import { elementsOfHtml, user } from "./config.js";
import { getData, postData } from "./requests.js";
import { toggleNavbarButtons, loginPopup } from "./generalFunctions.js";

function backFromLogin() {
    elementsOfHtml.loginEntries.map((input) => {
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
            loginPopup(
                "Wystąpił niespodziewany błąd, spróbuj ponownie później."
            );
        }
    } else if (loginResponse.status == 401) {
        loginPopup("Użytkownik o podanym loginie lub haśle nie istnieje!");
    } else {
        loginPopup("Wystąpił niespodziewany błąd, spróbuj ponownie później.");
    }
    document.getElementById("login-button").disabled = false;
}

function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    user.userData = undefined;
    toggleNavbarButtons();
}

export { backFromLogin, login, logout };
