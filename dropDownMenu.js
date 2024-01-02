import { elementsOfHtml } from "./config.js";

elementsOfHtml.toggleBtn.onclick = function () {
    elementsOfHtml.dropDownMenu.classList.toggle("dropdown-menu--open");
    elementsOfHtml.dropDownMenuIsOpen =
        elementsOfHtml.dropDownMenu.classList.contains("dropdown-menu--open");

    elementsOfHtml.toggleBtnIcon.classList = elementsOfHtml.dropDownMenuIsOpen
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
};

function disableDropdownMenu() {
    if (window.innerWidth > 768 && elementsOfHtml.dropDownMenuIsOpen) {
        elementsOfHtml.toggleBtn.click();
    }
}

export { disableDropdownMenu };
