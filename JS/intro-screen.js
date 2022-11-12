//READ TOP TO BOTTOM

//INTRO SEQUENCE
// Kickstarts the menu sequence
function beginIntroSequence() {
    $("#homepageTitle img").animate({ marginRight: "13px" });
    $("#homepageTitle").animate({ fontSize: "36px" });
    setTimeout(() => { $("#homepageButtons").removeClass("hide"); }, 1000);
}
// Begin Main Menu Animation Sequence
$(document).ready(function () { setTimeout(beginIntroSequence, 1000); });

//Attach event handler to 'Play'
function switchToTutorial() {
    $("#homepage").animate({ opacity: "0" }, () => {    //Fade out
        $("#homepage").addClass("turnoff"); //Disable the menu
        $("#gamepage").removeClass("turnoff");  //Enable the tutorial
        updateTutorialCardsPosition();  //Update tutorial cards positions
        $("#gamepage").animate({ opacity: "1" });   //Fade in
    })
};
$("#playGameBtn").click(switchToTutorial);