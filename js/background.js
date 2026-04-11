// ====================================================================================
// Variables
// ====================================================================================

const YT_DOMAIN = "www.youtube.com";
const OPTIONS = {
    BLOCK: "block-ytb-entirely",
    FOCUS: "focus-mode"
};

let hours, minutes, seconds;
let option;

// Listen requests from scripts.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        
    if (request.action === "START_WORK") {
        const payload = request.payload;
        
        hours = payload.hours;
        minutes = payload.minutes;
        seconds = payload.seconds;
        option = payload.option === 1 ? OPTIONS.BLOCK : OPTIONS.FOCUS;
            
        // Отвечаем попапу
        sendResponse({ status: "success" });
        
        console.log("1 Background received data: ", hours, ":", minutes, ":", seconds, ", ", option);
        
        // Find active tab and send message there
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0 && tabs[0].id) {
                
                chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
                    if (chrome.runtime.lastError) {
                        console.warn("1 Content script error: ", chrome.runtime.lastError.message);
                        return;
                    }
                    console.log("1 Content script responded: ", response.status);
                });
            }
        });
    }
    
    
    if (request.action === "CONTINUE_WORK") {
        chrome.runtime.sendMessage(request, (response) => {
            if (chrome.runtime.lastError) {
                console.warn("Popup error: ", chrome.runtime.lastError.message);
                return;
            }
            console.log("Popup responded: ", response.status);
        });
    }
        
    
    if (request.action === "STOP_WORK") {
        // Find active tab and send message there
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0 && tabs[0].id) {
                
                chrome.tabs.sendMessage(tabs[0].id, {action: "STOP_WORK"}, (response) => {
                    if (chrome.runtime.lastError) {
                        console.warn("1 Content script error: ", chrome.runtime.lastError.message);
                        return;
                    }
                    console.log("1 Content script responded: ", response.status);
                });
            }
        });
    }
    
    // Возвращаем true, если sendResponse будет вызван асинхронно (хорошая практика)
    return true; 
});


