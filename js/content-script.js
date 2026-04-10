//import * as Stuff from "./useful-stuff.js";

const YT_DOMAIN = "www.youtube.com";
const OPTIONS = {
    BLOCK: "block-ytb-entirely",
    FOCUS: "focus-mode"
};

let hours, minutes, seconds;
let option;

// ============================================
// Initialization
// ============================================

// Just testing
const container = document.getElementById("container");
const text = document.createElement("p");
text.textContent = "Random text";
text.style.fontSize = "4em";
text.style.backgroundColor = "white";

container.append(text);

setInterval(() => {
    text.textContent = Date.now();
}, 1000);


// Listen requests from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    // Synchronize data with scripts.js
    if (request.action === "START_WORK") {
        const payload = request.payload;
        
        hours = payload.hours;
        minutes = payload.minutes;
        seconds = payload.seconds;
        option = payload.option === 1 ? OPTIONS.BLOCK : OPTIONS.FOCUS;
            
        sendResponse({ status: "success" });
        
        console.log("2 Content script received data");
        console.log("2 Data: ", hours, ":", minutes, ":", seconds, ", ", option);
        // TODO: implement timer working and content blocking
        
    }
    
    return true; 
});


