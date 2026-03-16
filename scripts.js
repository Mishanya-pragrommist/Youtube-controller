const radioButtons = document.getElementsByName("preference");

const blockRadio = document.querySelector("[block-ytb-entirely]");

const blockBtn = document.querySelector("[block-btn]");
const focusBtn = document.querySelector("[focus-btn]");


blockRadio.addEventListener("checked", () => {
    blockBtn.style.width = "100px";
});


blockBtn.addEventListener("submit", (event) => {
    event.preventDefault();
});

