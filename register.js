// Import of required modules.
import { switchDisplay, displayPopup } from "./generalFunctions.js";
import { elementsOfHtml } from "./config.js";
import { postData } from "./requests.js";

// Function responsible for launching the register panel.
function enterToRegister(fromDropDownMenu) {
    // If launched from the dropdown menu, the toggle button will be auto-clicked.
    if (fromDropDownMenu) elementsOfHtml.toggleBtn.click();

    // Clearing inputs in the panel.
    Array.from(elementsOfHtml.registerEntries).forEach((input) => {
        input.value = "";
    });
    // Change the screen to the screen with the register panel.
    switchDisplay(2);
}

// Function responsible for checking whether the password in the password field and in the confirm password field match.
function checkPassword() {
    // Assigning the password confirmation input to a constant.
    const input = elementsOfHtml.registerEntries[4];
    // Checking whether the value from the password confirmation input is the same as the value from the password input.
    if (input.value != elementsOfHtml.registerEntries[3].value) {
        input.setCustomValidity("Hasła muszą się zgadzać.");
    } else {
        input.setCustomValidity("");
    }
}

// Function responsible for checking the correctness of the entered activation number.
function checkActivationNumber(activationNumber) {
    // Checking whether the entered number is equal to the number sent to the user's e-mail address.
    if (elementsOfHtml.authorizationEntry.value != activationNumber) {
        elementsOfHtml.authorizationEntry.setCustomValidity(
            "Numer aktywacyjny jest błędny."
        );
    } else {
        elementsOfHtml.authorizationEntry.setCustomValidity("");
    }
}

// Function responsible for adding a user to the database.
async function addUserToDatabase(event, data) {
    // Blocking the onsubmit event on the authorization form to avoid reloading the page.
    event.preventDefault();
    // Disabling the authorization button.
    document.getElementById("authorization-button").disabled = true;
    // Sending a request to add a user to the database.
    const registerResponse = await postData(
        "https://Grzegorz96.pythonanywhere.com/users/register",
        data
    );

    // If status 201 is received, the screen switches and a success message is displayed.
    if (registerResponse.status == 201) {
        switchDisplay(0);
        displayPopup(
            "Pomyślnie zarejestrowano i aktywowano konto, możesz się zalogować.",
            1
        );
        // In any other case, the screen switches and an error message is displayed.
    } else {
        switchDisplay(0);
        displayPopup(
            "Wystąpił błąd podczas rejestracji, spróbuj ponownie później.",
            1
        );
    }

    // Enabling the authorization button.
    document.getElementById("authorization-button").disabled = false;
}

// Function responsible for user registration.
async function register() {
    // Disabling the register button.
    document.getElementById("register-button").disabled = true;

    // Creating an object with validated user data.
    const data = {
        first_name: elementsOfHtml.registerEntries[0].value,
        last_name: elementsOfHtml.registerEntries[1].value,
        login: elementsOfHtml.registerEntries[2].value,
        password: elementsOfHtml.registerEntries[3].value,
        email: elementsOfHtml.registerEntries[5].value,
    };

    // Sending a request to check whether a given login and email no longer exist in the database.
    const checkUserDataResponse = await postData(
        "https://Grzegorz96.pythonanywhere.com/users/register/check-data",
        { login: data.login, email: data.email }
    );

    // Case of receiving status 200.
    if (checkUserDataResponse.status == 200) {
        // Sending a request to send the activation number to the user's email address provided.
        const sendActivationNumberResponse = await postData(
            "https://Grzegorz96.pythonanywhere.com/users/send-activation-number",
            { email_receiver: data.email }
        );

        // Case of receiving status 200.
        if (sendActivationNumberResponse.status == 200) {
            // Getting the generated activation number.
            const activationNumber = (await sendActivationNumberResponse.json())
                .result.activation_number;
            // Updated the information section.
            document.getElementById(
                "email-info"
            ).innerText = `Numer aktywacyjny został wysłany na adres: ${data.email}`;
            // Clearing the authorization input field.
            elementsOfHtml.authorizationEntry.value = "";
            // Adding an oninput event to the authorization input, which calls a check function with the generated activation number for the user.
            elementsOfHtml.authorizationEntry.oninput = () =>
                checkActivationNumber(activationNumber);
            // Adding an onsubmit event on the user authorization form, which triggers the function of adding a user to the database.
            document.getElementById("authorization-form").onsubmit = (event) =>
                addUserToDatabase(event, data);
            // Change the screen to the screen with the activate account panel.
            switchDisplay(3);
            // If you receive a status other than 200, display an error message.
        } else {
            displayPopup(
                "Wystąpił błąd podczas wysyłania kodu aktywacyjnego, spróbuj ponownie później.",
                3
            );
        }
        // Case of receiving status 226, display a message that email or login is not available.
    } else if (checkUserDataResponse.status == 226) {
        displayPopup("Login lub email są niedostępne.", 3);
        // If you receive a status other than 200 or 226, display an error message.
    } else {
        displayPopup(
            "Wystąpił błąd podczas rejestracji, spróbuj ponownie później.",
            3
        );
    }

    // Enabling the register button.
    document.getElementById("register-button").disabled = false;
}

// export functions.
export { enterToRegister, register, checkPassword };
