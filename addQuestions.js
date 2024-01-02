import { elementsOfHtml } from "./config.js";
import {
    switchDisplay,
    checkSessionOfUser,
    displayPopup,
} from "./generalFunctions.js";
import { postData } from "./requests.js";

function enterToAddQuestionPanel(fromDropDownMenu) {
    if (fromDropDownMenu) elementsOfHtml.toggleBtn.click();

    if (!checkSessionOfUser(false)) return;

    Array.from(elementsOfHtml.addQuestionEntries).forEach((input) => {
        input.value = "";
    });

    switchDisplay(8);
}

async function sendQuestion() {
    document.getElementById("add-question-button").disabled = true;

    if (!checkSessionOfUser(false)) return;

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

    await postQuestion(data);

    document.getElementById("add-question-button").disabled = false;
}

async function postQuestion(data) {
    const postQuestionResponse = await postData(
        `https://Grzegorz96.pythonanywhere.com/questions`,
        data,
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken")
    );

    if (postQuestionResponse.status == 201) {
        if (postQuestionResponse.headers.get("access-token")) {
            localStorage.setItem(
                "accessToken",
                postQuestionResponse.headers.get("access-token")
            );

            await postQuestion(data);
        } else {
            Array.from(elementsOfHtml.addQuestionEntries).forEach((input) => {
                input.value = "";
            });

            displayPopup("Pomyślnie dodano pytanie.", 6);
        }
    } else {
        displayPopup(
            "Wystąpił błąd podczas dodawania pytania, spróbuj ponownie później.",
            6
        );
    }
}
export { enterToAddQuestionPanel, sendQuestion };
