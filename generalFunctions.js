import { elementsOfHtml } from "./config.js"; // Objects of application.

function switchDisplay(indexOfContainer) {
    for (let container of elementsOfHtml.containers) {
        container.classList.remove("main-container-activated");
    }
    elementsOfHtml.containers[indexOfContainer].classList.add(
        "main-container-activated"
    );
}

export { switchDisplay };
