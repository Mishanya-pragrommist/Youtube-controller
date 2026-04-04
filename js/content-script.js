import * as Stuff from "./useful-stuff.js";

// ============================================
// Initialization
// ============================================

// Get data from background script
const data = Stuff.getData();
const time = new Stuff.Time();
time.setTime(data.time);
let option = data.option;

// Just testing
const container = document.getElementById("container");
const text = document.createElement("p");

text.textContent = "Option: " + option + ", time: " + time.toString();
text.style.fontSize = "4em";
text.style.backgroundColor = "white";

container.append(text);

