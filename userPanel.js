import { elementsOfHtml, user } from "./config.js";
import {
    switchDisplay,
    checkSessionOfUser,
    displayPopup,
} from "./generalFunctions.js";
import { logout } from "./login.js";
import { getData, updateData, deleteData } from "./requests.js";

function changeTypeOfPasswordInput(button) {
    const input = elementsOfHtml.userPanelEntries[2];

    if (input.type == "password") {
        input.type = "text";
        button.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        input.type = "password";
        button.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}

function changeStanOfUserPanelButtons(disabled) {
    Array.from(elementsOfHtml.userPanelBtns).map((button) => {
        button.disabled = disabled;
    });
}

function checkUserData(indexOfEntry) {
    const input = elementsOfHtml.userPanelEntries[indexOfEntry];

    if (input.value == user.userData[input.classList[1]]) {
        input.setCustomValidity("Zmień dane przed aktualizacją.");
    } else {
        input.setCustomValidity("");
    }
}

async function enterToUserPanel() {
    if (!checkSessionOfUser(false)) return;

    if (!user.userData) {
        if (!(await getLoggedInUserInfo())) return;
    }

    Array.from(elementsOfHtml.userPanelEntries).map((input) => {
        input.value = user.userData[input.classList[1]];
    });

    for (let i = 0; i < 3; i++) {
        checkUserData(i);
    }

    switchDisplay(7);
}

async function getLoggedInUserInfo() {
    const getUserDataResponse = await getData(
        `https://Grzegorz96.pythonanywhere.com/users/${user.userId}`,
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken")
    );

    if (getUserDataResponse.status == 200) {
        user.userData = (await getUserDataResponse.json()).result[0];
        return true;
    } else if (getUserDataResponse.status == 201) {
        localStorage.setItem(
            "accessToken",
            getUserDataResponse.headers.get("access-token")
        );

        return await getLoggedInUserInfo();
    } else {
        displayPopup(
            "Wystąpił błąd podczas pobierania danych użytkownika, spróbuj ponownie później.",
            0
        );
    }
}

async function updateUser(indexOfEntry) {
    changeStanOfUserPanelButtons(true);

    if (!checkSessionOfUser(false)) return;
    const input = elementsOfHtml.userPanelEntries[indexOfEntry];

    await patchLoggedInUserInfo({
        [input.classList[1]]: input.value,
    });

    changeStanOfUserPanelButtons(false);
}

async function patchLoggedInUserInfo(data) {
    const updateUserDataResponse = await updateData(
        `https://Grzegorz96.pythonanywhere.com/users/${user.userId}`,
        data,
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken")
    );

    if (updateUserDataResponse.status == 200) {
        user.userData[Object.keys(data)[0]] = Object.values(data)[0];

        for (let i = 0; i < 3; i++) {
            checkUserData(i);
        }

        displayPopup("Użytkownik pomyślnie zaktualizowany.", 3);
    } else if (updateUserDataResponse.status == 201) {
        localStorage.setItem(
            "accessToken",
            updateUserDataResponse.headers.get("access-token")
        );

        await patchLoggedInUserInfo(data);
    } else {
        displayPopup(
            "Wystąpił błąd podczas wysyłania danych użytkownika, spróbuj ponownie później.",
            3
        );
    }
}

async function deleteUser() {
    changeStanOfUserPanelButtons(true);

    if (!checkSessionOfUser(false)) return;

    await deleteLoggedInUser();

    changeStanOfUserPanelButtons(false);
}

async function deleteLoggedInUser() {
    const deleteUserResponse = await deleteData(
        `https://Grzegorz96.pythonanywhere.com/users/${user.userId}`,
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken")
    );

    if (deleteUserResponse.status == 200) {
        logout();
    } else if (deleteUserResponse.status == 201) {
        localStorage.setItem(
            "accessToken",
            deleteUserResponse.headers.get("access-token")
        );

        await deleteLoggedInUser();
    } else {
        displayPopup(
            "Wystąpił błąd podczas usuwania użytkownika, spróbuj ponownie później.",
            3
        );
    }
}

export {
    updateUser,
    enterToUserPanel,
    deleteUser,
    checkUserData,
    changeTypeOfPasswordInput,
};
