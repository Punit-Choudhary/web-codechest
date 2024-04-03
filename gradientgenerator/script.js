let firstColor = document.getElementById('first-color');
let secondColor = document.getElementById('second-color');
const outputCode = document.getElementById('code');
// let copyBtn = document.getElementById('copy');
const tooltip = document.querySelector('.tooltip');
const heading = document.getElementById('heading');

let currentDirection = 'to bottom';


function setDirection(value, _this) {
    let directions = document.querySelectorAll(".active");
    for (let i of directions) {
        i.classList.remove("active");
    }

    _this.classList.add("active");
    currentDirection = value
}

function generateCode() {
    outputCode.value = `background-image: linear-gradient(${currentDirection}, ${firstColor.value}, ${secondColor.value})`;
    document.getElementsByTagName("body")[0].style.backgroundImage = `linear-gradient(${currentDirection}, ${firstColor.value}, ${secondColor.value})`;
    heading.style.background = `linear-gradient(${currentDirection}, ${firstColor.value}, ${secondColor.value})`;
    heading.style.backgroundClip = 'text';
}

function copyCode() {
    navigator.clipboard.writeText(outputCode.value);
    // copyBtn.textContent = "Copied";
    tooltip.classList.add("show");
    setTimeout(() => {
        tooltip.classList.remove("show");
        // copyBtn.textContent = "Copy";
    }, 1000);
}

generateCode();