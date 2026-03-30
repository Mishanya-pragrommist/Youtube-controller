//Represents time in "hh:mm:ss" format
export class Time {
    constructor(hours, minutes, seconds) { 
        this.hours = (hours !== undefined ? hours : 0);
        this.minutes = (minutes !== undefined ? minutes : 0);
        this.seconds = (seconds !== undefined ? seconds : 0);
    }
    
    // Set seconds, minutes and hours separately
    set(seconds, minutes, hours) {
        this.seconds = seconds || 0;
        this.minutes = minutes || 0;
        this.hours = hours || 0;
    }
    
    // Set time using Time object
    setTime(time) {
        this.seconds = time.seconds;
        this.minutes = time.minutes;
        this.hours = time.hours;
    }
    
    // Set all values to 0
    reset() {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
    
    // Add seconds, minutes and hours separately
    add(seconds, minutes, hours) {
        if (seconds !== undefined) {
            this.seconds += seconds;
            if (this.seconds >= 60) {
                const extraMinutes = Math.floor(this.seconds / 60);
                this.seconds -= 60 * extraMinutes;
                this.minutes += extraMinutes;
            }
        }
        
        if (minutes !== undefined) {
            this.minutes += minutes;
            if (this.minutes >= 60) {
                const extraHours =  Math.floor(this.minutes / 60);
                this.minutes -= 60 * extraHours;
                this.hours += extraHours;
            }
        } 
        
        if (hours !== undefined) this.hours += hours;
    }
    
    // Add time using Time object
    addTime(time) {
        this.add(time.seconds, time.minutes, time.hours);
    }
    
    // Substract time. If not enough time, a RangeError is thrown
    substract(seconds, minutes, hours) {
        // If not enough time, throw an error
        if (this.toSeconds() < 
            (seconds + minutes * 60 + hours * 3600)) {
            throw new RangeError("Недостаточно времени для снятия");
        }
        
        this.seconds -= seconds;
        if (this.seconds < 0) {
            this.seconds *= -1;
            const extraMinutes = Math.ceil(this.seconds / 60);
            this.minutes -= extraMinutes;
            this.seconds = 60 * extraMinutes - this.seconds;
        }
        
        if (minutes !== undefined && minutes > 0) this.minutes -= minutes;
        if (this.minutes < 0) {
            this.minutes *= -1;
            const extraHours = Math.ceil(this.minutes / 60);
            this.hours -= extraHours;
            this.minutes = 60 * extraHours - this.minutes;
        }
        
        if (hours !== undefined && hours > 0)  this.hours -= hours;
    }
    
    // Substract time using Time object
    substractTime(time) {
        this.substract(time.seconds, time.minutes, time.hours);
    }
     
    // Round time to minutes in smaller side
    floor() { this.seconds = 0; }
    
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
            throw new RangeError("Time.down(): Недостаточно времени");
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
    
    // Return time in seconds
    toSeconds() {
        return this.seconds + this.minutes * 60 + this.hours * 3600;
    }
    
    // Format time in "hh:mm:ss" format
    toString() {
        // Eg,  5 -> "05", 12 -> "12"
        const pad = (num) => String(num).padStart(2, '0');
        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
    }
}
