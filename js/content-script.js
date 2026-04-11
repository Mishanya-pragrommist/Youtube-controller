//import * as Stuff from "./useful-stuff.js";

const YT_DOMAIN = "www.youtube.com";
const OPTIONS = {
    BLOCK: "block-ytb-entirely",
    FOCUS: "focus-mode"
};

let h, m, s;
let option;
let intervalId;

// DOM elements
const elems = [
    document.getElementById("contents"),
    document.getElementById("header"),
    document.getElementById("icon"),
    document.getElementById("guide-button")
];

// ============================================
// Initialization
// ============================================

// Just testing
const container = document.getElementById("container");
const text = document.createElement("p");
text.textContent = "Random text";
text.style.fontSize = "1em";
text.style.padding = "5px";
text.style.backgroundColor = "white";

container.append(text);

// Listen requests from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    // Synchronize data with scripts.js
    if (request.action === "START_WORK") {
        const payload = request.payload;
        
        h = payload.hours;
        m = payload.minutes;
        s = payload.seconds;
        option = payload.option === 1 ? OPTIONS.BLOCK : OPTIONS.FOCUS;
            
        sendResponse({ status: "success" });
        
        // TODO: implement timer working and content blocking
        
        text.textContent = `Time: ${h}:${m}:${s}, option: ${option}`;
        
        if (h !== 0 || m !== 0 || s !== 0) {
            intervalId = setInterval(countDown, 1000);
        }
        
        if (option == OPTIONS.FOCUS) focusMode(true);
    }
    
    if (request.action === "STOP_WORK") {
        clearInterval(intervalId);
        focusMode(false);
    }
    
    return true; 
});


function blockEntirely(isStarted) {
    
}

function focusMode(isStarted) {
    // Actual blocking
    elems.forEach((elem) => {elem.style.display = (isStarted ? "none" : "flex");});
}

// Decrease time by 1 second
function countDown() {
    // Check if time is bigger than 0
    if (h <= 0 && m <= 0 && s <= 0) {
        clearInterval(intervalId); // Stop timer
        text.textContent = "Time is up!"; // Just for testing
        
        focusMode(false); // Show hidden staff
        return;
    }
    
    // Decreasing time 
    s--;
    if (s < 0) {
        s = 59;
        m--;
    }
    if (m < 0) {
        m = 59;
        h--;
    }
    
    text.textContent = `Time: ${h}:${m}:${s}`; // Will be replaced with sending data to popup
    const data = {
        action: "CONTINUE_WORK",
        payload: {
            s: s,
            m: m,
            h: h
        }
    };
    sendData(data);
}


function sendData(data) {
     chrome.runtime.sendMessage(data, (response) => {
        if (chrome.runtime.lastError) {
            console.warn("Background is sleeping or killed: ", chrome.runtime.lastError.message);
            return;
        }
        console.log("Background script responded: ", response.status);
    });
}

