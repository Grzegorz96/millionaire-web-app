// Import of required modules.
import { elementsOfHtml } from "./config.js";
import {
    switchDisplay,
    checkSessionOfUser,
    displayPopup,
} from "./generalFunctions.js";
import { postData } from "./requests.js";

// Function responsible for loading the panel for adding questions.
function enterToAddQuestionPanel(fromDropDownMenu) {
    // If called from the dropdown menu, it will close automatically.
    if (fromDropDownMenu) elementsOfHtml.toggleBtn.click();

    // Checking whether the user session is still active.
    if (!checkSessionOfUser(false)) return;

    // Clearing all inputs in add question panel.
    Array.from(elementsOfHtml.addQuestionEntries).forEach((input) => {
        input.value = "";
    });

    // Change the screen to the screen with the add qestion panel.
    switchDisplay(8);
}

// Function responsible for preparing to send a question.
async function sendQuestion() {
    // Disabling the add question button.
    document.getElementById("add-question-button").disabled = true;

    // Checking whether the user session is still active.
    if (!checkSessionOfUser(false)) return;

    // Creating an object with question data.
    const data = {
        content: elementsOfHtml.addQuestionEntries[0].value,
        answers: [
            elementsOfHtml.addQuestionEntries[1].value,
            elementsOfHtml.addQuestionEntries[2].value,
            elementsOfHtml.addQuestionEntries[3].value,
            elementsOfHtml.addQuestionEntries[4].value,
        ],
        right_answer: elementsOfHtml.addQuestionEntries[5].value,
        difficulty: elementsOfHtml.addQuestionEntries[6].value,
    };

    // Calling the question sending function.
    await postQuestion(data);
    // Enabling the add question button.
    document.getElementById("add-question-button").disabled = false;
}

// Function responsible for sending a question.
async function postQuestion(data) {
    // Sending a request to add a question.
    const postQuestionResponse = await postData(
        `https://Grzegorz96.pythonanywhere.com/questions`,
        data,
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken")
    );

    // Case of receiving status 201.
    if (postQuestionResponse.status == 201) {
        // If we received a new access token in the header, overwrite it in local memory and repeat the request.
        if (postQuestionResponse.headers.get("access-token")) {
            localStorage.setItem(
                "accessToken",
                postQuestionResponse.headers.get("access-token")
            );
            await postQuestion(data);
            // If we received 201 without a new access token, it means that the addition was successful, we clear the inputs and display the message.
        } else {
            Array.from(elementsOfHtml.addQuestionEntries).forEach((input) => {
                input.value = "";
            });
            displayPopup("Pomyślnie dodano pytanie.", 6);
        }
        // If you receive a status other than 201, display an error message.
    } else {
        displayPopup(
            "Wystąpił błąd podczas dodawania pytania, spróbuj ponownie później.",
            6
        );
    }
}

// export functions.
export { enterToAddQuestionPanel, sendQuestion };
