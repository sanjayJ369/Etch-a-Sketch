const sketchPad = document.querySelector(".sketchPad");
console.log(sketchPad.offsetWidth);

const pixelCount = 24;
const pixelSize = (sketchPad.offsetWidth)/ pixelCount;

//sets the pixel size of each pixel
document.documentElement.style.setProperty("--pixelSize", `${pixelSize}px`)

let pixels = [];

for (let i=0; i<pixelCount; i++) {
    for (let j=0; j<pixelCount; j++) {
        let pixel = document.createElement('div');
        pixel.setAttribute('class', 'pixel');

        sketchPad.appendChild(pixel);
        pixels.push(pixel);
    }
}

//code to check if the mouse button is click or not
let mouseDown = false;
document.body.onmousedown = function () {
    mouseDown = true;
};


document.body.onmouseup = function () {
    mouseDown = false;
};


//function which return the color to be set
function getColor() {
    return "black";
}

//function to check the background of the pixels
function colorPixel(e) {
    if (mouseDown) e.target.style.cssText = "background-color: black";
}

//adding event listeners to the pixels

pixels.forEach (pixel => {
    pixel.addEventListener("mousedown", (e) => {
        console.log("hi");
        e.target.style.cssText = `background-color: ${getColor()}`;
    });
    pixel.addEventListener("mouseover", colorPixel);
});

console.log(pixels.length);