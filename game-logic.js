//Get Button Selectors
const lesserBtn = document.querySelector("#lesserBtn");
const equalBtn = document.querySelector("#equalBtn");
const greaterBtn = document.querySelector("#greaterBtn");

const textContainer = document.querySelector("#textContainer");

const diceContainer = document.querySelector(".diceContainer");
const dice = document.querySelector("#dice");
const diceNumber = document.querySelector("#diceNumber");

var _rolling = false;   //used to track for tutorial end kickoff
var rolling = false;    //used to track otherwise
const diceRollDuration = 2000;  //Enter value in ms. Experiment to find out plz

var currentNumber = null;

// GAME LOGIC FUNCTIONS
function rollDice() {
    if (!rolling) {
        rolling = true; //Setup

        //Move Dice to Center of Screen
        DiceToCenter(() => {

            //"Play" the animation


        });

        // //Switch the IMG to GIF
        // dice.src = "assets/Roll1.gif";

        // //Switch back to PNG and decide random number
        // setTimeout(() => {
        //     dice.src = "assets/dice-static.png"

        //     currentNumber = getRandomInt(1, 12);
        //     diceNumber.innerHTML = currentNumber;

        //     // Cleanup
        //     _rolling = false;
        //     rolling = false;
        // }, diceRollDuration)


        //Switch back to PNG
    }
}
function DiceToCenter(callback) {
    textContainer.classList.add("hideTextContainer");
    diceContainer.classList.add("diceToCenter");
    callback();
}


// HELPER FUNCTIONS
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}