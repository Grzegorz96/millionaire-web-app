import { switchDisplay } from "./generalFunctions.js";

function backFromRegister() {
    Array.from(document.getElementsByTagName("input"))
        .slice(2, 8)
        .map((input) => {
            input.value = "";
        });
    switchDisplay(0);
}

export { backFromRegister };
