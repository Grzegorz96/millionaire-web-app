import { switchDisplay, displayPopup } from "./generalFunctions.js";
import { elementsOfHtml } from "./config.js";
import { postData } from "./requests.js";

function enterToRegister() {
    Array.from(elementsOfHtml.registerEntries).forEach((input) => {
        input.value = "";
    });
    switchDisplay(2);
}

function checkPassword() {
    const input = elementsOfHtml.registerEntries[4];
    if (input.value != elementsOfHtml.registerEntries[3].value) {
        input.setCustomValidity("Hasła muszą się zgadzać.");
    } else {
        input.setCustomValidity("");
    }
}

async function register() {
    document.getElementById("register-button").disabled = true;

    const data = {
        first_name: elementsOfHtml.registerEntries[0].value,
        last_name: elementsOfHtml.registerEntries[1].value,
        login: elementsOfHtml.registerEntries[2].value,
        password: elementsOfHtml.registerEntries[3].value,
        email: elementsOfHtml.registerEntries[5].value,
    };

    const checkUserDataResponse = await postData(
        "https://Grzegorz96.pythonanywhere.com/users/register/check-data",
        { login: data.login, email: data.email }
    );

    if (checkUserDataResponse.status == 200) {
        const sendActivationNumberResponse = await postData(
            "https://Grzegorz96.pythonanywhere.com/users/send-activation-number",
            { email_receiver: data.email }
        );

        if (sendActivationNumberResponse.status == 200) {
            const activationNumber = (await sendActivationNumberResponse.json())
                .result.activation_number;
            document.getElementById(
                "email-info"
            ).innerText = `Numer aktywacyjny został wysłany na adres: ${data.email}`;
            elementsOfHtml.authorizationEntry.value = "";
            elementsOfHtml.authorizationEntry.oninput = () => {
                if (
                    elementsOfHtml.authorizationEntry.value != activationNumber
                ) {
                    elementsOfHtml.authorizationEntry.setCustomValidity(
                        "Numer aktywacyjny jest błędny."
                    );
                } else {
                    elementsOfHtml.authorizationEntry.setCustomValidity("");
                }
            };
            document.getElementById("authorization-form").onsubmit = async (
                event
            ) => {
                event.preventDefault();
                document.getElementById("authorization-button").disabled = true;
                const registerResponse = await postData(
                    "https://Grzegorz96.pythonanywhere.com/users/register",
                    data
                );

                if (registerResponse.status == 201) {
                    switchDisplay(0);
                    displayPopup(
                        "Pomyślnie zarejestrowano i aktywowano konto, możesz się zalogować.",
                        1
                    );
                } else {
                    switchDisplay(0);
                    displayPopup(
                        "Wystąpił błąd podczas rejestracji, spróbuj ponownie później.",
                        1
                    );
                }
                document.getElementById(
                    "authorization-button"
                ).disabled = false;
            };

            switchDisplay(3);
        } else {
            displayPopup(
                "Wystąpił błąd podczas wysyłania kodu aktywacyjnego, spróbuj ponownie później.",
                3
            );
        }
    } else if (checkUserDataResponse.status == 226) {
        displayPopup("Login lub email są niedostępne.", 3);
    } else {
        displayPopup(
            "Wystąpił błąd podczas rejestracji, spróbuj ponownie później.",
            3
        );
    }
    document.getElementById("register-button").disabled = false;
}

export { enterToRegister, register, checkPassword };
