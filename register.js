import { switchDisplay, displayPopup } from "./generalFunctions.js";
import { elementsOfHtml } from "./config.js";
import { postData } from "./requests.js";

function enterToRegister() {
    Array.from(elementsOfHtml.registerEntries).map((input) => {
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
    const firstName = elementsOfHtml.registerEntries[0].value;
    const lastName = elementsOfHtml.registerEntries[1].value;
    const login = elementsOfHtml.registerEntries[2].value;
    const password = elementsOfHtml.registerEntries[3].value;
    const email = elementsOfHtml.registerEntries[5].value;

    const checkUserDataResponse = await postData(
        "https://Grzegorz96.pythonanywhere.com/users/register/check-data",
        { login: login, email: email }
    );

    if (checkUserDataResponse.status == 200) {
        const sendActivationNumberResponse = await postData(
            "https://Grzegorz96.pythonanywhere.com/users/send-activation-number",
            { email_receiver: email }
        );

        if (sendActivationNumberResponse.status == 200) {
            const activationNumber = (await sendActivationNumberResponse.json())
                .result.activation_number;
            document.getElementById(
                "email-info"
            ).innerText = `Numer aktywacyjny został wysłany na adres: ${email}`;
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
                    {
                        first_name: firstName,
                        last_name: lastName,
                        login: login,
                        password: password,
                        email: email,
                    }
                );

                if (registerResponse.status == 201) {
                    switchDisplay(0);
                    displayPopup(
                        "Pomyślnie zarejestrowano i aktywowano konto, możesz się zalogować.",
                        0
                    );
                } else {
                    switchDisplay(0);
                    displayPopup(
                        "Wystąpił błąd podczas rejestracji, spróbuj ponownie później.",
                        0
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
                2
            );
        }
    } else if (checkUserDataResponse.status == 226) {
        displayPopup("Login lub email są niedostępne.", 2);
    } else {
        displayPopup(
            "Wystąpił błąd podczas rejestracji, spróbuj ponownie później.",
            2
        );
    }
    document.getElementById("register-button").disabled = false;
}

export { enterToRegister, register, checkPassword };
