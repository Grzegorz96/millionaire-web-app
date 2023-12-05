import { switchDisplay } from "./generalFunctions.js";

function backFromLogin() {
    Array.from(document.getElementsByTagName("input"))
        .slice(0, 2)
        .map((input) => {
            input.value = "";
        });
    switchDisplay(0);
}

export { backFromLogin };
