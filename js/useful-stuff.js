//Represents time in "hh:mm:ss" format
export class Time {
    constructor(hours, minutes, seconds) { 
        this.hours = hours || 0;
        this.minutes = minutes || 0;
        this.seconds = seconds || 0;
    }
    
    // Set seconds, minutes and hours separately
    set(seconds, minutes, hours) {
        this.seconds = seconds || 0;
        this.minutes = minutes || 0;
        this.hours = hours || 0;
    }
    
    setTime(time) {
        //if (typeof time !== Time){
        //    throw Error("setTime: Incorrect type. Shoud be Time, but is ", typeof time);
        //}
        this.set(time.seconds, time.minutes, time.hours);
    }

    // Set all values to 0
    reset() {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
    
    // Increase time by 1 second
    up() {
        this.seconds++;
        if (this.seconds >= 60) {
            this.seconds = 0;
            this.minutes++;
        }
        if (this.minutes >= 60) {
            this.minutes = 0;
            this.hours++;
        }
    }
    
    // Decrease time by 1 second. If not enough time, a RangeError is thrown
    down() {
        if (this.hours <= 0 &&
            this.minutes <= 0 &&
            this.seconds <= 0) {
            throw new RangeError("Time.down(): Not enough time");
        }
        this.seconds--;
        if (this.seconds < 0) {
            this.seconds = 59;
            this.minutes--;
        }
        if (this.minutes < 0) {
            this.minutes = 59;
            this.hours--;
        }
    }
    
    hasTime() {
        return this.hours > 0 || this.minutes > 0 || this.seconds > 0;
    }
    
    // Format time in "hh:mm:ss" format
    toString() {
        // Eg,  5 -> "05", 12 -> "12"
        const pad = (num) => String(num).padStart(2, '0');
        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
    }
}

const BLOCK_YT_OPTION = "block-ytb-entirely";
const FOCUS_MODE_OPTION = "focus-mode";

// Get data from background script
export function getData() {
    let data = {};
    chrome.runtime.sendMessage({ action: "GET_DATA" }, (response) => {
        if (response) {
            console.log("Background data is gotten:", response);
            data = {
                seconds: response.seconds,
                time: new Time(response.hours, 
                               response.minutes, 
                               response.seconds),
                option: response.option === 1 ? BLOCK_YT_OPTION : FOCUS_MODE_OPTION
            };
        }
        else throw Error("Unable to get data from background");
    });
    
    return data;
}

// Send data to background script
export function sendData(time, option) {
    
    console.log("starting sendDataToBackground()");
    
    // Pack data into object with numbers
    const dataToSend = {
        action: "UPDATE_DATA", // Command for background
        payload: {
            seconds: time.seconds,
            minutes: time.minutes,
            hours: time.hours,
            choice: option === "block-ytb-entirely" ? 1 : 2
        }
    };
    
    // Send data
    chrome.runtime.sendMessage(dataToSend, (response) => {
        if (chrome.runtime.lastError) {
            console.warn("Background script is sleeping or killed: ", chrome.runtime.lastError.message);
            return;
        }
        console.log("Background responded: ", response.status);
    });
    console.log("sendDataToBackground() worked");
}
