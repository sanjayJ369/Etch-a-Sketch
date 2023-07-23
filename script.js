const sketchPad = document.querySelector(".sketchPad");
console.log(sketchPad.offsetWidth);

const pixelCount = 30;
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

console.log(pixels.length);