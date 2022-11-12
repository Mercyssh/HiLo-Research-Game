// Handles Interactions / UI Related to the Credits Page

$("#creditsBtn").click(ShowCreditsPage);
$("#backToHomeBtn").click(HideCreditsPage);

function ShowCreditsPage() {
    $("#credits").removeClass("turnoff");
    $("#homepage").addClass("turnoff");
}

function HideCreditsPage() {
    $("#credits").addClass("turnoff");
    $("#homepage").removeClass("turnoff");
}