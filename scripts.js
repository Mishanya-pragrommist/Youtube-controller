// ========================================================
// DOM-elements
// ========================================================

// Radiobuttons
const radioButtonsBlock = document.querySelector("[radiobuttons]");
const blockRadio = radioButtonsBlock.querySelector("[block-ytb-entirely]");
const focusRadio = radioButtonsBlock.querySelector("[focus-mode]");
const customSettingsRadio = radioButtonsBlock.querySelector("[custom-settings]");

// Buttons
const blockBtn = document.querySelector("[block-btn]");
const focusBtn = document.querySelector("[focus-btn]");
const resetBtn = document.querySelector("[reset-btn]");

const timeInputBlock = document.querySelector("[time-input-block]");
const customSettingsSection = document.querySelector("[custom-settings-section]");

// ========================================================
// Initialisation
// ========================================================

timeInputBlock.style.display = "none";
customSettingsSection.style.display = "none";


// ========================================================
// Event listeners
// ========================================================


radioButtonsBlock.addEventListener("change", (event) => {
    const option = event.target.value;
    
    // Show or hide time input for focus mode
    if (option === "focus-mode") {
        timeInputBlock.style.display = "block";
    } else timeInputBlock.style.display = "none";
    
    
    // Show or hide custom settings
    if (option === "custom-settings") {
        customSettingsSection.style.display = "block";
    }
    else {
        customSettingsSection.style.display = "none";
    }
});

resetBtn.addEventListener("click", () => {
    
});


blockBtn.addEventListener("submit", (event) => {
    event.preventDefault();
    
});


