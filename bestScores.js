// Import of required modules.
import { getData } from "./requests.js";
import { switchDisplay, displayPopup } from "./generalFunctions.js";
import { elementsOfHtml } from "./config.js";

// The function responsible for downloading the list of the best players and dynamically building an HTML structure depending on how many results it downloads.
async function getBestScores() {
    // If the dropdown menu is currently open, close it automatically.
    if (elementsOfHtml.dropDownMenuIsOpen) elementsOfHtml.toggleBtn.click();

    // Sending a request to download the list of top players.
    const getBestScoresResponse = await getData(
        "https://Grzegorz96.pythonanywhere.com/scores"
    );

    // Case of receiving status 200.
    if (getBestScoresResponse.status == 200) {
        // Downloading the list of best results objects.
        const scores = (await getBestScoresResponse.json()).result;
        // Creating a panel exit button and header.
        let newInnerHtml = `<button class="back back--modifier1" onclick="switchDisplay(0)" type="button">
                                <i class="fa-solid fa-x"></i>
                            </button>
                            <div class="top-players">Lista najlepszych wyników:</div>`;

        // Depending on how many records were retrieved, the number of divs with the results will be created.
        for (let i = 0; i < scores.length; i++) {
            if (i == 0) {
                newInnerHtml += `<div class="results best-player">
                                    <div class="person">
                                        ${scores[i].first_name} ${scores[i].last_name}
                                    </div>
                                    <div class="points">${scores[i].points}pkt</div>
                                </div>`;
            } else {
                newInnerHtml += `<div class="results">
                                    <div class="person">
                                        ${scores[i].first_name} ${scores[i].last_name}
                                    </div>
                                    <div class="points">${scores[i].points}pkt</div>
                                </div>`;
            }
        }

        // Assigning the newly created HTML code to the internal HTML of the best-scores container.
        document.getElementById("best-scores").innerHTML = newInnerHtml;
        // Change the screen to the screen with the best scores panel.
        switchDisplay(6);
        // If you receive a status other than 200, display an error message.
    } else {
        displayPopup(
            "Wystąpił błąd podczas pobierania najlepszych wyników, spróbuj ponownie później.",
            1
        );
    }
}

// export function.
export { getBestScores };
