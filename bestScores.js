import { getData } from "./requests.js";
import { switchDisplay } from "./generalFunctions.js";

async function bestScores() {
    const response = await getData(
        "https://Grzegorz96.pythonanywhere.com/scores"
    );

    if (response.status == 200) {
        const bestScoresWindow = document.getElementById("best-scores");
        console.log(bestScoresWindow);
        const scores = (await response.json()).result;
        bestScoresWindow.appendChild(document.createElement("div"));
        for (let i = 0; i < scores.length; i++) {
            const element = document.createElement("div");
            const text = document.createTextNode(
                `Miejsce ${i + 1}: ${scores[i].first_name} ${
                    scores[i].last_name
                } - ${scores[i].points}pkt`
            );
            element.style.fontSize = "1.2rem";
            element.style.border = "1px solid white";
            element.style.width = "100%";
            element.appendChild(text);
            bestScoresWindow.appendChild(element);
        }
    }
    switchDisplay(6);
}

export { bestScores };
