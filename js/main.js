import * as Stuff from "./useful-stuff.js";

// ========================================================
// DOM-elements
// ========================================================

const BLOCK_YT_OPTION = "block-ytb-entirely";
const FOCUS_MODE_OPTION = "focus-mode";

// Text "Choose blocking mode" and "Enjoy it!"
const instructionText = document.querySelector("[instruction-text-js]");

// The form itself
const form = document.querySelector("[form-js]");

// Radiobuttons
const optionsBlock = document.querySelector("[options-block]");
const blockRadio = optionsBlock.querySelector("[block-ytb-entirely]");
const focusRadio = optionsBlock.querySelector("[focus-mode]");
//const customSettingsCheckbox = radioButtonsBlock.querySelector("[custom-settings]");

// Buttons
const startBtn = document.querySelector("[start-btn]");
const stopBtn = document.querySelector("[stop-btn]");
const resetBtn = document.querySelector("[reset-btn]");

// Inputs and sections
const timeInputBlock = document.querySelector("[time-input-block]");
const timeInput = document.querySelector("[time-input]");
const customSettingsSection = document.querySelector("[custom-settings-section]");

// Timer block
const timer = document.querySelector("[timer-js]");

const time = new Stuff.Time();
let option;

async function updateData() {
    try {
        const data = await Stuff.getData();
        time.setTime(data.time);
        option = data.option;
    } 
    catch (error) {
        console.error("Error while updating data:", error);
    }
}

// ========================================================
// Initialisation
// ========================================================

// TODO: create reading data from background
// instead of just hiding elements
// so when the extension is closed and the page is reloaded,
// it would still block content

// Hide stuff
timeInputBlock.style.display = "block";
resetBtn.style.display = "block";
stopBtn.style.display = "none";
timer.style.display = "none";

// Getting initial data from background script
updateData();

// ========================================================
// Event listeners
// ========================================================

// For now, it's just for debugging
// In future, it will show custom settings
// if user chooses it
optionsBlock.addEventListener("change", (event) => {
    const option = event.target.value;
    console.log("option: ", option);
});

// Handling Start button click
startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    option = formData.get("preference"); // Radio button value
    
    // Get hours, minutes and seconds from time input
    const timeParts = formData.get("time-input").split(":");
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const seconds = timeParts[2];
    
    // Setting time (all undefined values will be 0)
    time.set(seconds, minutes, hours);
    
    // Hide Start and Reset btn, show Stop btn
    stopBtn.style.display = "block";
    startBtn.style.display = "none";
    resetBtn.style.display = "none";
    
    // Hide options and show timer
    optionsBlock.style.display = "none";
    
    if (time.hasTime()) {
        timer.style.display = "block";
        timer.textContent = time.toString(); // Set time in timer block
    }
    else timer.style.display = "none";
    
    
    // Changing text right under header
    const optionText = (option === "block-ytb-entirely" ? 
          "blocking Yt entirely" : "focus mode") + "!";
    instructionText.textContent = "Enjoy " + optionText;
    
    // Synchronizing data with background
    Stuff.sendData(time, option);
});


stopBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    
    // Get data from background script
    updateData();
    
    // Show options again and hide timer
    optionsBlock.style.display = "flex";
    timer.style.display = "none";
    
    // Changing text under header
    instructionText.textContent = "Choose blocking mode";
    
    // Hide stop btn and show start btn
    stopBtn.style.display = "none";
    startBtn.style.display = "block";
    resetBtn.style.display = "block";
    
    timeInput.value = time.toString();
});

resetBtn.addEventListener("click", (event) => {
    time.reset();
    timer.textContent = "00:00:00";
    option = "block-ytb-entirely";
    Stuff.sendData(time, option);
});
