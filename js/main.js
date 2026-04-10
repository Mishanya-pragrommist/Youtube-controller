// ========================================================
// Constants and options
// ========================================================
const YT_DOMAIN = "www.youtube.com";
const OPTIONS = {
    BLOCK: "block-ytb-entirely",
    FOCUS: "focus-mode"
};

// ========================================================
// DOM-elements
// ========================================================
const elements = {
    warningText: document.querySelector("[warning]"),
    mainBlock: document.querySelector("[main-block]"),
    instructionText: document.querySelector("[instruction-text-js]"),
    form: document.querySelector("[form-js]"),
    optionsBlock: document.querySelector("[options-block]"),
    timeInput: document.querySelector("[time-input]"),
    timer: document.querySelector("[timer-js]"),
    // Buttons
    startBtn: document.querySelector("[start-btn]"),
    stopBtn: document.querySelector("[stop-btn]"),
    resetBtn: document.querySelector("[reset-btn]"),
    // Containers
    timeInputBlock: document.querySelector("[time-input-block]")
};

// Struct with hours, minutes, seconds and option
let currentState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    option: OPTIONS.BLOCK
};

// ========================================================
// Initialization functions
// ========================================================

async function init() {
    const tab = await getCurrentTab();
    const isYoutube = new URL(tab.url).hostname === YT_DOMAIN;

    toggleYoutubeWarning(isYoutube);
    
    if (isYoutube) {
        setupInitialUI();
    }
}

function setupInitialUI() {
    elements.stopBtn.style.display = "none";
    elements.timer.style.display = "none";
    elements.startBtn.style.display = "block";
    elements.resetBtn.style.display = "block";
}

// ========================================================
// Useful functions
// ========================================================

async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    return tab;
}

// If user is not on Youtube, hide form 
// and show text like "You are not on Youtube"
function toggleYoutubeWarning(isOnYoutube) {
    elements.warningText.style.display = isOnYoutube ? "none" : "block";
    elements.mainBlock.style.display = isOnYoutube ? "block" : "none";
}

// Switch visibility of setting form and workmode of extention
function toggleWorkMode(isWorking) {
    elements.stopBtn.style.display = isWorking ? "block" : "none";
    elements.startBtn.style.display = isWorking ? "none" : "block";
    elements.resetBtn.style.display = isWorking ? "none" : "block";
    elements.optionsBlock.style.display = isWorking ? "none" : "flex";
}

// Send data to 
function sendData(currentState) {
    chrome.runtime.sendMessage({
        
    });
}

// ========================================================
// EventListeners
// ========================================================

// For start button
elements.startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Get data
    const formData = new FormData(elements.form);
    const [h, m, s] = formData.get("time-input").split(":").map(Number);
    const selectedOption = formData.get("preference");
    // Set data in struct
    currentState = { hours: h || 0, minutes: m || 0, seconds: s || 0, option: selectedOption };
    
    // Update mode text
    const modeName = selectedOption === OPTIONS.BLOCK ? "blocking Yt entirely" : "focus mode";
    elements.instructionText.textContent = `Enjoy ${modeName}!`;
    
    // Show timer if there is time
    if (currentState.hours || currentState.minutes || currentState.seconds) {
        elements.timer.textContent = `${h}:${m}:${s}`;
        elements.timer.style.display = "block";
    }
    
    // Hide form and show extention working
    toggleWorkMode(true);
    // Stuff.sendData(currentState);
});

// For STOP button
elements.stopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Show settings form
    toggleWorkMode(false);
    elements.timer.style.display = "none";
    elements.instructionText.textContent = "Choose blocking mode";
});

// For RESET button
elements.resetBtn.addEventListener("click", () => {
    elements.form.reset();
    elements.timer.textContent = "00:00:00";
    // Stuff.sendData(null);
});

// Start work of the script
init();
