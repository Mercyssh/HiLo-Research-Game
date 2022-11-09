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
var lastNumber = null;
var op = null;


//###EVENT HANDLERS
$("#lesserBtn").click(rollDice);
$("#equalBtn").click(rollDice);
$("#greaterBtn").click(rollDice);

//###END EVENT HANDLERS



// GAME LOGIC FUNCTIONS
/* #region DICE ROLL SEQUENCE*/
function rollDice(ele) {
    if (!rolling) {
        rolling = true; //Setup

        //Cache last value
        lastNumber = currentNumber;

        //Get Op from ele
        console.log(ele);

        //###Execute Sequence
        DiceToCenter(800, () =>
            DiceToGIF(diceRollDuration, () =>
                DiceToPNG(500, DiceToDefault)
            )
        );
        //###SequenceEnd

    }
}
function DiceToCenter(delay, callback) {
    textContainer.classList.add("hideTextContainer");
    diceContainer.classList.add("diceToCenter");
    setTimeout(callback, delay);
}
function DiceToGIF(delay, callback) {
    diceNumber.innerHTML = "";
    dice.src = "assets/Roll1.gif";
    setTimeout(callback, delay);
}
function DiceToPNG(delay, callback) {
    //Dice just stopped Rolling. In the Center of the Screen
    dice.src = "assets/dice-static.png"

    // Get New number
    currentNumber = getRandomInt(1, 12);
    diceNumber.innerHTML = currentNumber;

    //Compare new number with previous against user choice
    if (lastNumber != null || op != null) {
        var correct = eval(`${lastNumber}${op}${currentNumber}`);
        op = null;
        console.log(correct);
    }

    _rolling = false; rolling = false;  //cleanup

    setTimeout(callback, delay);
}
function DiceToDefault() {
    textContainer.classList.remove("hideTextContainer");
    diceContainer.classList.remove("diceToCenter");
}
/* #endregion */


// HELPER FUNCTIONS
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}