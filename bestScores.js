import { getData } from "./requests.js";
import { switchDisplay, displayPopup } from "./generalFunctions.js";

async function bestScores() {
    const response = await getData(
        "https://Grzegorz96.pythonanywhere.com/scores"
    );

    if (response.status == 200) {
        const scores = (await response.json()).result;
        let newInnerHtml = `<button class="back back--modifier1" onclick="switchDisplay(0)" type="button">
                                <i class="fa-solid fa-x"></i>
                            </button>
                            <div class="top-players">Lista najlepszych wyników:</div>`;

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

        document.getElementById("best-scores").innerHTML = newInnerHtml;
        switchDisplay(6);
    } else {
        displayPopup(
            "Wystąpił błąd podczas pobierania najlepszych wyników, spróbuj ponownie później.",
            0
        );
    }
}

export { bestScores };
