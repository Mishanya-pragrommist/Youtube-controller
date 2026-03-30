// ========================================================
// DOM-elements
// ========================================================

const form = document.querySelector("[form-js]");

// Radiobuttons
const radioButtonsBlock = document.querySelector("[options-block]");
const blockRadio = radioButtonsBlock.querySelector("[block-ytb-entirely]");
const focusRadio = radioButtonsBlock.querySelector("[focus-mode]");
//const customSettingsCheckbox = radioButtonsBlock.querySelector("[custom-settings]");

// Buttons
const startBtn = document.querySelector("[start-btn]");
const stopBtn = document.querySelector("[stop-btn]");
const resetBtn = document.querySelector("[reset-btn]");

// Inputs and sections
const timeInputBlock = document.querySelector("[time-input-block]");
const timeInput = document.querySelector("[time-input]");
const customSettingsSection = document.querySelector("[custom-settings-section]");

// ========================================================
// Initialisation
// ========================================================

// TODO: create reading data from localStorage
// instead of just hiding elements

// Hide stuff
timeInputBlock.style.display = "block";
stopBtn.style.display = "none";

// ========================================================
// Event listeners
// ========================================================

radioButtonsBlock.addEventListener("change", (event) => {
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
    const formData = new FormData(form);
    const option = formData.get("preference");
    
    // Get hours, minutes and seconds
    const timeParts = formData.get("time-input").split(":");
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const seconds = timeParts[2];
    
    // Hide start btn and show stop btn
    stopBtn.style.display = "block";
    startBtn.style.display = "none";
    
    // Hide options and show timer
    form.disabled = "true";
    
    console.log("blockBtn worked. option: ", option, "; time: ", timeParts);
});

stopBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    // Hide stop btn and show start btn
    stopBtn.style.display = "none";
    startBtn.style.display = "block";
});
