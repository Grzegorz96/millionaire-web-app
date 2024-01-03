import { elementsOfHtml } from "./config.js";

elementsOfHtml.toggleBtn.onclick = function () {
    elementsOfHtml.dropDownMenu.classList.toggle("dropdown-menu--open");
    elementsOfHtml.dropDownMenuIsOpen =
        elementsOfHtml.dropDownMenu.classList.contains("dropdown-menu--open");

    if (elementsOfHtml.dropDownMenuIsOpen) {
        elementsOfHtml.toggleBtnIcon.classList = "fa-solid fa-x";
        Array.from(elementsOfHtml.dropDownMenu.children).forEach(
            (button) => (button.tabIndex = 0)
        );
    } else {
        elementsOfHtml.toggleBtnIcon.classList = "fa-solid fa-bars";
        Array.from(elementsOfHtml.dropDownMenu.children).forEach(
            (button) => (button.tabIndex = -1)
        );
    }
};

function disableDropdownMenu() {
    if (window.innerWidth > 768 && elementsOfHtml.dropDownMenuIsOpen) {
        elementsOfHtml.toggleBtn.click();
    }
}

export { disableDropdownMenu };
