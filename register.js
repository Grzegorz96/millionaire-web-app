import { switchDisplay } from "./generalFunctions.js";
import { elementsOfHtml, user, dataToRegister } from "./config.js";
import { postData } from "./requests.js";

function backFromRegister() {
    Array.from(elementsOfHtml.registerEntries).map((input) => {
        input.value = "";
    });
    switchDisplay(0);
}

function checkPassword() {
    const input = elementsOfHtml.registerEntries[4];
    if (input.value != elementsOfHtml.registerEntries[3].value) {
        input.setCustomValidity("Hasła muszą się zgadzać.");
    } else {
        input.setCustomValidity("");
    }
}

function checkActivationNumber() {
    const input = document.getElementById("authorization-account");
    if (input.value != dataToRegister.activationNumber) {
        input.setCustomValidity("Numer aktywacyjny jest błędny.");
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
            dataToRegister.activationNumber = (
                await sendActivationNumberResponse.json()
            ).result.activation_number;

            dataToRegister.firstName = firstName;
            dataToRegister.lastName = lastName;
            dataToRegister.login = login;
            dataToRegister.password = password;
            dataToRegister.email = email;

            backFromRegister();
            switchDisplay(3);
        } else {
            console.log("Nie udało się wysłać kodu aktywacyjnego.");
        }
    } else if (checkUserDataResponse.status == 226) {
        console.log("login lub email są niedostępne.");
    } else {
        console.log(
            "Wystąpił błąd podczas rejestracji spróbuj ponownie później."
        );
    }
    document.getElementById("register-button").disabled = false;
}

async function activate() {
    document.getElementById("authorization-button").disabled = true;
    const registerResponse = await postData(
        "https://Grzegorz96.pythonanywhere.com/users/register",
        {
            first_name: dataToRegister.firstName,
            last_name: dataToRegister.lastName,
            login: dataToRegister.login,
            password: dataToRegister.password,
            email: dataToRegister.email,
        }
    );

    if (registerResponse.status == 201) {
        console.log(dataToRegister);
        console.log("zarejerstrowany i aktywowany");
        for (let key in dataToRegister) {
            console.log(key);
            delete dataToRegister[key];
        }
        document.getElementById("authorization-account").value = "";
        switchDisplay(0);
        console.log(dataToRegister);
    } else {
        console.log("NIeudalo sie zarejestrować");
        for (let key in dataToRegister) {
            delete dataToRegister[key];
        }
        document.getElementById("authorization-account").value = "";
        switchDisplay(0);
    }
    document.getElementById("authorization-button").disabled = false;
}

export {
    backFromRegister,
    register,
    checkPassword,
    activate,
    checkActivationNumber,
};
