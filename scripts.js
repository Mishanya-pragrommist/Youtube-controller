// ========================================================
// DOM-elements
// ========================================================

const form = document.querySelector("[form-block]");

// Radiobuttons
const radioButtonsBlock = document.querySelector("[radiobuttons]");
const blockRadio = radioButtonsBlock.querySelector("[block-ytb-entirely]");
const focusRadio = radioButtonsBlock.querySelector("[focus-mode]");
const customSettingsCheckbox = radioButtonsBlock.querySelector("[custom-settings]");

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
customSettingsSection.style.display = "none"; // Will be implemented later

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


// TODO: create eventListeners for:
//      Start;
//      Stop.
    

startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const option = formData.get("preference");
    
    // Get hours, minutes and seconds
    const timeParts = formData.get("time-input").split(":");
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const seconds = timeParts[2];
    
    console.log("blockBtn worked. option: ", option, "; time: ", timeParts);
});


