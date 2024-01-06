// Import of required modules.
import { elementsOfHtml } from "./config.js";

// Assigning an onclick event to the toggle button object that calls the function.
elementsOfHtml.toggleBtn.onclick = function () {
    // Toggle the dropdown-menu--open class on the dropDownMenu element.
    elementsOfHtml.dropDownMenu.classList.toggle("dropdown-menu--open");
    // Setting the dropDownMenuIsOpen property to true or false depending on whether the dropDownMenu element has a class.
    elementsOfHtml.dropDownMenuIsOpen =
        elementsOfHtml.dropDownMenu.classList.contains("dropdown-menu--open");

    // If the dropdown menu is open, we change its icon and set the tabindex of its children to 0, which means we can tab through them.
    if (elementsOfHtml.dropDownMenuIsOpen) {
        elementsOfHtml.toggleBtnIcon.classList = "fa-solid fa-x";
        Array.from(elementsOfHtml.dropDownMenu.children).forEach(
            (button) => (button.tabIndex = 0)
        );
        // If the dropdown menu is closed, we change its icon and set the tabindex of its children to -1, which means we remove the possibility of tab after them.
    } else {
        elementsOfHtml.toggleBtnIcon.classList = "fa-solid fa-bars";
        Array.from(elementsOfHtml.dropDownMenu.children).forEach(
            (button) => (button.tabIndex = -1)
        );
    }
};

// Function responsible for automatically closing the dropdown menu when the browser window is expanded to a certain size.
function disableDropdownMenu() {
    // When the browser window increases in size to larger than 768px and the dropdown menu is open at that time, the dropdown menu will automatically close.
    if (window.innerWidth > 768 && elementsOfHtml.dropDownMenuIsOpen) {
        elementsOfHtml.toggleBtn.click();
    }
}

// export function.
export { disableDropdownMenu };
