import { switchDisplay } from "./generalFunctions.js";
import { elementsOfHtml } from "./config.js";

function backFromRegister() {
    elementsOfHtml.registerEntries.map((input) => {
        input.value = "";
    });
    switchDisplay(0);
}

function register() {
    const firstName = elementsOfHtml.registerEntries[0].value;
    const lastName = elementsOfHtml.registerEntries[1].value;
    const login = elementsOfHtml.registerEntries[2].value;
    const password = elementsOfHtml.registerEntries[3].value;
    const email = elementsOfHtml.registerEntries[5].value;

    console.log(firstName);
    console.log(lastName);
    console.log(login);
    console.log(password);
    console.log(email);

    // getData("https://Grzegorz96.pythonanywhere.com/users/login", { login: login, password: password }).then(
    //     (response) => console.log(response)
    // );
}

export { backFromRegister, register };
