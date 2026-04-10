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
    
    
    if (request.action === "GET_DATA") {
        sendResponse({
            seconds: time.seconds,
            minutes: time.minutes,
            hours: time.hours,
            choice: option === BLOCK_YT_OPTION ? 1 : 2
        });
    }
    
    
    if (request.action === "START_WORK") {
        const payload = request.payload;
        
        hours = payload.hours;
        minutes = payload.minutes;
        seconds = payload.seconds;
        option = payload.option === 1 ? OPTIONS.BLOCK : OPTIONS.FOCUS;
            
        // Отвечаем попапу
        sendResponse({ status: "success" });
        
        console.log("1 Background received data: ", hours, ":", minutes, ":", seconds, ", ", option);
        
        // Находим активную вкладку и отправляем сообщение именно в нее
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0 && tabs[0].id) {
                // Пересылаем исходный объект request, так как content-script ждет request.action
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
    
    // Возвращаем true, если sendResponse будет вызван асинхронно (хорошая практика)
    return true; 
});


