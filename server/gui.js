import { boxShadow, imgArray } from "../constants/index.js";
import Dice from "./logic.js";

const dice = new Dice();

let inputs;

const updateDiceImages = () => {
    const values = dice.getValues();
    for (let i = 0; i < values.length; i++) {
        let diceImage = document.getElementById(`die${i + 1}`);

        if (!diceImage) {
            console.error(`Could not find element with id: die${i + 1}`);
            continue;
        }
        diceImage.src = `../resources/DiceImages/${values[i]}.svg`;
    }
};

const updateResults = () => {
    for (let i = 0; i < dice.getResults().length; i++) {
        inputs[i].value =
            dice.results[i].value === null ? "" : dice.results[i].value;
    }
};

const calculateBonus = () => {
    let bonus = 0;
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        if (dice.results[i].value !== null) {
            sum += dice.results[i].value;
        }
    }
    // bonus if sum of 1-6 is 63 or more
    if (sum >= 63) {
        bonus += 50;
    }
    return bonus;
};

const calculateAndUpdateSumBonusTotal = () => {
    let sum = 0;
    for (let i = 0; i < dice.results.length - 1; i++) {
        if (dice.results[i].value !== null && dice.results[i].status) {
            sum += dice.results[i].value;
        }
    }
    document.getElementById("sum").value = sum;

    let bonus = calculateBonus();
    document.getElementById("bonus").value = bonus;

    let total = sum + bonus;
    document.getElementById("total").value = total;
};

const roll = () => {
    if (dice.getThrowCount() < 3) {
        dice.throwDice();
        updateDiceImages();
        updateResults();

        document.getElementById("turn").innerHTML = dice.getThrowCount();
        document.getElementById("score").innerHTML =
            document.getElementById("total").value * 100;
    }
};

const reset = () => {
    dice.resetThrowCount();
    dice.resetResult();
    updateResults();
    baseDiceImage();
    resetDiceHold();
    calculateAndUpdateSumBonusTotal();
    document.getElementById("turn").innerHTML = dice.getThrowCount();
    document.getElementById("total").value = 0;
    document.getElementById("bonus").value = 0;
    document.getElementById("score").innerHTML =
        document.getElementById("total").value * 100;
    inputs.forEach((input) => {
        input.value = "";
        input.disabled = false;
        input.style.boxShadow = "none";
    });
};

const baseDiceImage = () => {
    // Ensure mainArray is properly initialized
    let mainArray = new Array(5)
        .fill(null)
        .map(() => imgArray[Math.floor(Math.random() * imgArray.length)]);

    for (let i = 0; i < 5; i++) {
        let diceImage = document.getElementById(`die${i + 1}`);
        if (diceImage) {
            diceImage.src = mainArray[i];
        } else {
            console.error(`Could not find element with id: die${i + 1}`);
        }
    }
};

for (let i = 1; i <= 5; i++) {
    document.getElementById(`die${i}`).onclick = () => {
        if (dice.throwCount !== 0) {
            if (dice.holdDie(i - 1)) {
                document.getElementById(`die${i}`).style.boxShadow = boxShadow;
            } else {
                document.getElementById(`die${i}`).style.boxShadow = "none";
            }
        }
    };
}

window.onload = () => {
    baseDiceImage();
    initResults();
};

const initResults = () => {
    const labelDiv = document.querySelector(".bottom-left-left-container");
    const inputDiv = document.querySelector(".bottom-left-right-container");
    for (let i = 0; i < dice.results.length; i++) {
        let label = document.createElement("label");
        labelDiv.append(label);
        label.innerText = camelCaseToTitle(dice.results[i].name);
        label.htmlFor = dice.results[i].name;

        let input = document.createElement("input");
        inputDiv.append(input);
        input.type = "text";
        input.className = "input";
        input.readOnly = true;
        input.id = dice.results[i].name;

        input.addEventListener("click", (e) => holdResult(e));
    }

    inputs = Array.from(document.querySelectorAll(".input"));
};

const camelCaseToTitle = text => text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, str => str.toUpperCase());


const holdResult = (e) => {
    if (dice.throwCount == 0) return;
    const input = e.target;
    input.disabled = true;
    input.style.boxShadow = boxShadow;

    dice.results.find((result) => {
        if (result.name === input.id) {
            result.status = true;
        }
    });

    calculateAndUpdateSumBonusTotal();
    document.getElementById("score").innerHTML =
        document.getElementById("total").value * 100;

    dice.throwCount = 0;
    document.getElementById("turn").innerHTML = dice.getThrowCount();
    dice.resetDiceHold();
    resetDiceHold();
    baseDiceImage();
    dice.setValues([null, null, null, null, null]);
};

const resetDiceHold = () => {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`die${i}`).style.boxShadow = "none";
    }
};

document.getElementById("roll-button").onclick = roll;

document.getElementById("reset-button").onclick = reset;
