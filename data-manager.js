// Initialize
const { createClient } = supabase;
const supa = createClient('https://bwelwmjevmptzarfwqgw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3ZWx3bWpldm1wdHphcmZ3cWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDU3MDEsImV4cCI6MTk4Mzc4MTcwMX0.eZ3x5muATEt0KCgs2zhd0cowvK2W-RHShRhkTx1ODaw');

var data_gameplay;  //Tracks each move
var data_win, data_score, data_bonus_shots, data_predictions;   //Tracks other stuff

// Call function to push everything inside the form
async function pushUserData() {
    // Grab all the data from game-logic.js
    data_gameplay = gamedata;
    data_win = win;
    data_score = score;
    data_bonus_shots = bonus_shots;
    data_predictions = predictions_counter;

    // Try to PUSH the data to the DB
    const { data, error } = await supa
        .from('reports')
        .insert([{
            id: Date.now(),
            user_id: localStorage.getItem("uid"),
            created_at: new Date,
            gameplay_data: data_gameplay,
            win: data_win,
            score: data_score,
            bonus_shots: data_bonus_shots,
            predictions: data_predictions
        }]).select()

    // If Errored!
    if (error) {
        console.log(error);
    }

    // If Success!
    if (data) {
        console.log("pushed successfully")
        console.log(data);
    }

}

/* #region CREATE & ASSIGN UID : localStorage.getItem("uid")*/
// FUNCTION TO GENERATE UID
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Assign UID to Localstorage
if (!localStorage.getItem("uid"))
    localStorage.setItem("uid", makeid(15));
else
    console.log(localStorage.getItem("uid"));
/* #endregion */

