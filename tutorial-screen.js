var tutorialCards = document.querySelectorAll(".tutorialcard");

//Align all tutorial cards
$(document).ready(function () {
    for (var c of tutorialCards) {
        c.addEventListener("click", nextTutorialCard);
    }
});

// Function used to make sure the tutorial cards are in the correct position
function updateTutorialCardsPosition() {

    console.log(tutorialCards);
    for (var c of tutorialCards) {
        if (c.getAttribute("data-hook") != "") {

            //Pull info
            var _hook = document.querySelector(c.getAttribute("data-hook")); //Target element to show over

            var _hook_rect = _hook.getBoundingClientRect(); //Rect of element
            var _offset = c.getAttribute("data-offset"); //Above or below the element
            var _margin = parseInt(c.getAttribute("data-margin"));   //How much above or below

            //Get _margin /w direction
            _margin = (_offset == "above" ? -1 : 1) * _margin;

            //Move to hook : Center of hook +- Offset
            c.style.left = (_hook_rect.x + (_hook_rect.width / 2)) + "px";
            c.style.top = (_hook_rect.y + (_hook_rect.height / 2)) + _margin + "px";

        }
    }
}
window.addEventListener("resize", updateTutorialCardsPosition); //Update on resize

// Function which switches to the next card on click on current card
function nextTutorialCard() {
    var tutorialCards = document.querySelectorAll(".tutorialcard");

    //Find current card : and switch to next
    for (var card in tutorialCards) {
        if (parseInt(card) < tutorialCards.length - 1) {
            if (tutorialCards[card].getAttribute("data-status") == "active") {
                var _hook = $(tutorialCards[card].getAttribute("data-hook"));
                var _next_hook = $(tutorialCards[parseInt(card) + 1].getAttribute("data-hook"))

                //disable me
                tutorialCards[card].setAttribute("data-status", "inactive") //status
                tutorialCards[card].classList.remove("tutorialShow")    //visual
                // _hook.removeClass("tutorialPop");   //z order

                //enable next
                if (parseInt(card) + 1 < tutorialCards.length) {
                    tutorialCards[parseInt(card) + 1].setAttribute("data-status", "active");    //status
                    tutorialCards[parseInt(card) + 1].classList.add("tutorialShow");    //visual
                    // _next_hook.addClass("tutorialPop"); //z order
                }

                break;
            }
        } else {
            //Disable tutorial if ur on last card
            disableTutorial();
        }
    }
}

//Simply call this to completely disable the tutorial
function disableTutorial() {
    //Fade out and turn off
    $("#tutorial").animate({ opacity: 0 }, 1000, () => {
        $("#tutorial").addClass("turnoff");
    })
}
//Call this to bring it back again!
function enableTutorial() {

}