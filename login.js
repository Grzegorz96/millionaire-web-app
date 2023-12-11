import {
    switchDisplay,
    toggleNavbarButtons,
    loginPopup,
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

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
        return null;
    }
};

async function getLoggedInUserInfo(userId) {
    const getUserDataResponse = await getData(
        `https://Grzegorz96.pythonanywhere.com/users/${userId}`,
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken")
    );

    if (getUserDataResponse.status == 200) {
        user.userData = (await getUserDataResponse.json()).result[0];
    } else if (getUserDataResponse.status == 201) {
        localStorage.setItem(
            "accessToken",
            getUserDataResponse.headers.get("access-token")
        );

        getLoggedInUserInfo(userId);
    } else if (
        getUserDataResponse.status == 401 ||
        getUserDataResponse.status == 500 ||
        getUserDataResponse.status == 404
    ) {
        logout();
    }
}

function checkSessionOfUser() {
    if (
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
    ) {
        const jwtRefreshToken = parseJwt(localStorage.getItem("refreshToken"));
        if (jwtRefreshToken) {
            if (Date.now() >= jwtRefreshToken.exp * 1000) {
                logout();
            } else {
                getLoggedInUserInfo(jwtRefreshToken.sub);
            }
        } else {
            logout();
        }
    }
}

export { backFromLogin, login, logout, checkSessionOfUser };
