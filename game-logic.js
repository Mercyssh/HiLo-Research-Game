//TODO
//WIN / LOOSE SCREENS
//DATABASE ARCHITECTURE
//DATABASE IMPLEMENTATION

/* #region SELECTORS*/
const predictionsLeft = document.querySelector("#predictionsLeft");
const bonusShotContainer = document.querySelector("#bonusShotContainer");

const lesserBtn = document.querySelector("#lesserBtn");
const equalBtn = document.querySelector("#equalBtn");
const greaterBtn = document.querySelector("#greaterBtn");

const textContainer = document.querySelector("#textContainer");

const diceContainer = document.querySelector(".diceContainer");
const dice = document.querySelector("#dice");
const diceNumber = document.querySelector("#diceNumber");

const flasher = document.querySelector("#flasher");

const scoreElement = document.querySelector("#score");
const _root = document.querySelector(":root");
/* #endregion */

var _rolling = false;   //used to track for tutorial end kickoff
var rolling = false;    //used to track otherwise
const diceRollDuration = 2000;  //Enter value in ms. Experiment to find out plz

// Trackers - DONT TOUCH THIS
var currentNumber = null;
var lastNumber = null;
var op = null;
var win = false;
var gameOn = true;  //Tracks when the game ends
var streak = 0; //Should start at 0
var multiplier = 1; //Ideally 1, set to 2 on Bonus Shot

// Controllable parameters
var score = 100;    //Starting Score
var maxScore = 500; //Maximum Value
var increment = 25; //Enter % Value
var decrement = 10; //Decrement % Value
var predictions = 15;   //Number of chances

//###EVENT HANDLERS
$("#lesserBtn").click(rollDice);
$("#equalBtn").click(rollDice);
$("#greaterBtn").click(rollDice);

// Choose Yes/No Bonus Shot Buttons
$("#yesShot").click(() => { ApplyBonus(true) });
$("#noShot").click(() => { ApplyBonus(false) });
//###END EVENT HANDLERS

// GAME LOGIC FUNCTIONS
/* #region DICE ROLL SEQUENCE*/
function rollDice(ele) {
    if (!rolling) {
        rolling = true; //Setup

        //Cache last value
        lastNumber = currentNumber;

        //Get Op from ele
        if (ele != undefined || ele != null)
            op = ele.target.getAttribute("data-op");

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

    // Reset Fire Dice if it exists
    $("#dice").removeClass("onFire");
    $("#fireEffect").addClass("hide");

    DetermineOutcome(); //Determine Score, Streak, Prediction counts
    if (streak >= 3) OfferStreak();  //Offer Streak
    WinLoseChecks(); //Perform Win and Loose Checks. Call Game End function if needed

    _rolling = false; rolling = false;  //cleanup

    setTimeout(callback, delay);
}
function DiceToDefault() {
    textContainer.classList.remove("hideTextContainer");
    diceContainer.classList.remove("diceToCenter");
}
/* #endregion */

/* #region OUTCOME DETERMINATION*/
function DetermineOutcome() {
    // Get New number
    currentNumber = getRandomInt(1, 12);
    diceNumber.innerHTML = currentNumber;

    if (lastNumber != null || op != null || op != undefined) {
        var correct = eval("" + lastNumber + op + currentNumber);
        op = null;

        // Win / Flash Animation
        if (correct) {
            correctFlashSequence(); //Green Flash
            score = Math.round(MathClamp(score + (score * increment * multiplier / 100), 0, maxScore));  //Increase by 25%
            streak++;   //Increment Streak
        }
        else {
            wrongFlashSequence();   //Red Flash
            score = Math.round(MathClamp(score - (score * decrement * multiplier / 100), 0, maxScore))  //Decrease by 25%
            streak = 0;   //Reset Streak
        }

        //Reset Multiplier after using it
        multiplier = 1;

        //Update UI
        scoreElement.innerHTML = score + "/" + maxScore;
        var _perc = (100 / maxScore * score) + "%";
        _root.style.setProperty('--scoreFillWidth', _perc);

        //Subtract a prediciton;
        predictions--;
        predictionsLeft.innerHTML = `You have ${predictions} predictions left`;

        console.log("guess: " + correct + "\n" + "streak: " + streak);
    }
}

// Makes checks for win and loose conditions
// Might move this into Main DetermineOutcome function
function WinLoseChecks() {
    //You win if you reach the max Score
    if (score == maxScore) GameEnd(true);
    //You lose if you run out of predictions
    if (predictions <= 0) GameEnd(false);
}

// Call when you want to offer a streak to the player
function OfferStreak() {

    //Update UI : Hide remainind preds, show offer, disable other ui
    $("#predictionsLeft").animate({ opacity: 0 }, () => {
        predictionsLeft.classList.add("turnoff");
        bonusShotContainer.classList.remove("turnoff");
        promptContainer.classList.add("disabled");
    })

    streak = 0;   // Reset Streak
}

// Call on click of yes or no btn
function ApplyBonus(bool) {
    if (bool) {
        multiplier = 2; //Set multiplier
        $("#dice").addClass("onFire") //Enable Fire
        $("#fireEffect").removeClass("hide");   //Unhide Fire
    }

    //Update UI : Show remainind preds, hide offer, enable other ui
    $("#predictionsLeft").animate({ opacity: 1 }, () => {
        predictionsLeft.classList.remove("turnoff");
        bonusShotContainer.classList.add("turnoff");
        promptContainer.classList.remove("disabled");
    })
}

// Call when the game ends
function GameEnd(bool) {
    // Blast Confetti...
    if (bool) {

    }
    // Show Lose Screen
    if (!bool) {

    }
}
/* #endregion */

/* #region FLASH SEQUENCES */
function correctFlashSequence() {
    flasher.classList.add("correctFlash");
    setTimeout(() => { flasher.classList.remove("correctFlash"); }, 500);
}
// Call when wrong guess
function wrongFlashSequence() {
    flasher.classList.add("wrongFlash");
    setTimeout(() => { flasher.classList.remove("wrongFlash"); }, 500);
}
/* #endregion */

/* #region HELPER FUNCTIONS */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function MathClamp(value, min, max) {
    //Clamp Both ways
    value = Math.min(Math.max(0, value), max);
    return value;
}
/* #endregion */