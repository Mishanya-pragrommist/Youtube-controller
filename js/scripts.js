import { Time } from "./time.js";

// ========================================================
// DOM-elements
// ========================================================

// Text "Choose blocking mode" and "Enjoy it!"
const instructionText = document.querySelector("[instruction-text-js]");

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

// ========================================================
// Initialisation
// ========================================================

// TODO: create reading data from localStorage
// instead of just hiding elements

// Hide stuff
timeInputBlock.style.display = "block";
stopBtn.style.display = "none";
timer.style.display = "none";

const time = new Time();

// ========================================================
// Event listeners
// ========================================================

optionsBlock.addEventListener("change", (event) => {
    const option = event.target.value;
    console.log("option: ", option);
    
    
    // Show or hide custom settings
    //if (option === "custom-settings") {
    //    customSettingsSection.style.display = "block";
    //}
    //else customSettingsSection.style.display = "none";
    //
});

startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    // Getting data
    
    const formData = new FormData(form);
    const option = formData.get("preference"); // Radio button value
    
    // Get hours, minutes and seconds from time input
    const timeParts = formData.get("time-input").split(":");
    let hours = timeParts[0];
    let minutes = timeParts[1];
    let seconds = timeParts[2];
    
    time.set(seconds, minutes, seconds);
    
    // Hide start btn and show stop btn
    stopBtn.style.display = "block";
    startBtn.style.display = "none";
    
    // Hide options and show timer
    optionsBlock.style.display = "none";
    
    // Set time in timer block
    timer.style.display = time.hasTime() ? "block" : "none";
    
    // Changing text right under header
    const optionText = (option === "block-ytb-entirely" ? 
          "blocking Yt entirely" : "focus mode") + "!";
    instructionText.textContent = "Enjoy " + optionText;
    
    timer.textContent = time.toString();
    
    // For debugging
    console.log("blockBtn worked. option: ", option, "; time: ", time.toString());
});

stopBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    // Show options again and hide timer
    optionsBlock.style.display = "flex";
    timer.style.display = "none";
    
    // Changing text right after header
    instructionText.textContent = "Choose blocking mode";
    
    // Hide stop btn and show start btn
    stopBtn.style.display = "none";
    startBtn.style.display = "block";
});
