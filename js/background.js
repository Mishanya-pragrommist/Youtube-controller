import { Time } from "./time.js";

// Initialization

const time = new Time();

const BLOCK_YT_OPTION = "block-ytb-entirely";
const FOCUS_MODE_OPTION = "focus-mode";

let option = BLOCK_YT_OPTION;

console.log("Background service is active");

// Listen requests from scripts.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    // Send data to scripts.js
    if (request.action === "GET_DATA") {
        sendResponse({
            seconds: time.seconds,
            minutes: time.minutes,
            hours: time.hours,
            choice: option === BLOCK_YT_OPTION ? 1 : 2
        });
    }
    
    // Synchronize data with scripts.js
    if (request.action === "UPDATE_DATA") {
        const payload = request.payload;
        
        time.set(payload.seconds, payload.minutes, payload.hours);
        option = payload.option === 1 ? BLOCK_YT_OPTION : FOCUS_MODE_OPTION;
        
        console.log("Background data was successfully updated!");
        console.log("Time: ", time.toString(), ", option: ", option);
        
        sendResponse({ status: "success" });
        
        // TODO: implement timer working and content blocking
        
    }

    // Возвращаем true, если sendResponse будет вызван асинхронно (хорошая практика)
    return true; 
});


