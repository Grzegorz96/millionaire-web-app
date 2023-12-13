import { elementsOfHtml, user } from "./config.js";
import {
    switchDisplay,
    checkSessionOfUser,
    getUserIdFromJwt,
} from "./generalFunctions.js";
import { logout } from "./login.js";
import { getData } from "./requests.js";

function backFromUserPanel() {
    Array.from(elementsOfHtml.userPanelEntries).map((input) => {
        input.value = "";
    });
    switchDisplay(0);
}

async function userPanel() {
    console.log(user.userData);
    checkSessionOfUser(false);

    if (!user.userData) {
        await getLoggedInUserInfo(getUserIdFromJwt());
    }

    Array.from(elementsOfHtml.userPanelEntries).map((input) => {
        input.value = user.userData[input.classList[1]];
    });
    console.log(user.userData);

    switchDisplay(7);
}

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
    } else {
        logout();
    }
}

function updateUser() {
    console.log("uruchomiona funkcja testowa");
}

export { updateUser, backFromUserPanel, userPanel };
