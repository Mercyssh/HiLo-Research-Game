//Get Button Selectors
const lesserBtn = document.querySelector("#lesserBtn");
const equalBtn = document.querySelector("#equalBtn");
const greaterBtn = document.querySelector("#greaterBtn");

const dice = document.querySelector("#dice");
var rolling = false;
const diceRollDuration = 1500;  //Enter value in ms. Experiment to find out plz

var currentNumber = null;

// GAME LOGIC FUNCTIONS
function rollDice() {
    if (!rolling) {
        rolling = true;
        //Switch the IMG to GIF
        dice.src = "assets/Roll1.gif";

        //Switch back to PNG and decide random number
        setTimeout(() => {
            dice.src = "assets/dice-static.png"
            console.log("paused");


            rolling = false;
        }, diceRollDuration)
        //Switch back to PNG
    }
}

// HELPER FUNCTIONS
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}