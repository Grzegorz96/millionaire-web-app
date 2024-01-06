// Import of required modules.
import { elementsOfHtml, user } from "./config.js";
import {
    switchDisplay,
    checkSessionOfUser,
    displayPopup,
} from "./generalFunctions.js";
import { logout } from "./login.js";
import { getData, updateData, deleteData } from "./requests.js";

// Function responsible for disabling all buttons on the user panel.
function changeStanOfUserPanelButtons(disabled) {
    Array.from(elementsOfHtml.userPanelBtns).forEach((button) => {
        button.disabled = disabled;
    });
}

// Function responsible for checking whether the user has changed data before sending a query to the backend.
function checkUserData(indexOfEntry) {
    const input = elementsOfHtml.userPanelEntries[indexOfEntry];

    // If the value in a specific input is equal to the value of the current user data, a message will be displayed.
    if (input.value == user.userData[input.classList[1]]) {
        input.setCustomValidity("Zmień dane przed aktualizacją.");
    } else {
        input.setCustomValidity("");
    }
}

// Function responsible for launching the user panel.
async function enterToUserPanel(fromDropDownMenu) {
    // If launched from the dropdown menu, the toggle button will be auto-clicked.
    if (fromDropDownMenu) elementsOfHtml.toggleBtn.click();

    // Checking whether the user session is still active.
    if (!checkSessionOfUser(false)) return;

    // If the user has not downloaded his data before, this will happen now.
    if (!user.userData) {
        if (!(await getLoggedInUserInfo())) return;
    }

    // Filling all inputs on the user panel with his data.
    Array.from(elementsOfHtml.userPanelEntries).forEach((input) => {
        input.value = user.userData[input.classList[1]];
    });
    // Execution of the checking function for the first time.
    for (let i = 0; i < 3; i++) {
        checkUserData(i);
    }
    // Change the screen to the screen with the user panel.
    switchDisplay(7);
}

// Function responsible for downloading information about the logged in user.
async function getLoggedInUserInfo() {
    // Sending a request.
    const getUserDataResponse = await getData(
        `https://Grzegorz96.pythonanywhere.com/users/${user.userId}`,
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken")
    );

    // Receiving a response with status 200, assigning json to the userData property.
    if (getUserDataResponse.status == 200) {
        user.userData = (await getUserDataResponse.json()).result[0];
        return true;
        // Receiving a response with status 201, the user received a new access token, the response is repeated.
    } else if (getUserDataResponse.status == 201) {
        localStorage.setItem(
            "accessToken",
            getUserDataResponse.headers.get("access-token")
        );
        return await getLoggedInUserInfo();
        // If you receive a status other than 200 or 201, an error message will be displayed.
    } else {
        displayPopup(
            "Wystąpił błąd podczas pobierania danych użytkownika, spróbuj ponownie później.",
            1
        );
    }
}

// Function responsible for preparing to send data for updating.
async function updateUser(indexOfEntry) {
    // Disabling buttons on the user panel.
    changeStanOfUserPanelButtons(true);

    // Checking whether the user session is still active.
    if (!checkSessionOfUser(false)) return;

    // Calling the user patchLoggedInUserInfo function and creating a response data object as an argument.
    const input = elementsOfHtml.userPanelEntries[indexOfEntry];
    await patchLoggedInUserInfo({
        [input.classList[1]]: input.value,
    });

    // Enabling buttons on the user panel.
    changeStanOfUserPanelButtons(false);
}

// Function responsible for sending updated user data to the backend.
async function patchLoggedInUserInfo(data) {
    // Sending a request.
    const updateUserDataResponse = await updateData(
        `https://Grzegorz96.pythonanywhere.com/users/${user.userId}`,
        data,
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken")
    );

    // Receiving a response with status 200, updating the information in the user object, automatically re-executing the check function, and displaying a message.
    if (updateUserDataResponse.status == 200) {
        user.userData[Object.keys(data)[0]] = Object.values(data)[0];

        for (let i = 0; i < 3; i++) {
            checkUserData(i);
        }

        displayPopup("Użytkownik pomyślnie zaktualizowany.", 5);
        // Receiving a response with status 201, the user received a new access token, the response is repeated.
    } else if (updateUserDataResponse.status == 201) {
        localStorage.setItem(
            "accessToken",
            updateUserDataResponse.headers.get("access-token")
        );

        await patchLoggedInUserInfo(data);
        // If you receive a status other than 200 or 201, an error message will be displayed.
    } else {
        displayPopup(
            "Wystąpił błąd podczas wysyłania danych użytkownika, spróbuj ponownie później.",
            5
        );
    }
}

// Function responsible for preparing to delete a user.
async function deleteUser() {
    // Disabling buttons on the user panel.
    changeStanOfUserPanelButtons(true);

    // Checking whether the user session is still active.
    if (!checkSessionOfUser(false)) return;

    // Calling the function to remove the user.
    await deleteLoggedInUser();

    // Enabling buttons on the user panel.
    changeStanOfUserPanelButtons(false);
}

// Function responsible for deleting a user on the backend.
async function deleteLoggedInUser() {
    // Sending a request.
    const deleteUserResponse = await deleteData(
        `https://Grzegorz96.pythonanywhere.com/users/${user.userId}`,
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken")
    );

    // Receiving a response with status 200, automatic user logout.
    if (deleteUserResponse.status == 200) {
        logout("Konto pomyślnie usunięte.");
        // Receiving a response with status 201, the user received a new access token, the response is repeated.
    } else if (deleteUserResponse.status == 201) {
        localStorage.setItem(
            "accessToken",
            deleteUserResponse.headers.get("access-token")
        );

        await deleteLoggedInUser();
        // If you receive a status other than 200 or 201, an error message will be displayed.
    } else {
        displayPopup(
            "Wystąpił błąd podczas usuwania użytkownika, spróbuj ponownie później.",
            5
        );
    }
}

// export functions.
export { updateUser, enterToUserPanel, deleteUser, checkUserData };
