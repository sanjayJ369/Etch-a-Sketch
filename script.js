
let pixelCount = 10;
let colorMode = "black";
const shade = document.querySelector("#shade");


//function to convert hex into rgba
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}


//function which return the color to be set
function getRandomColor() {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let a = 1;
    
    if (shade.checked) {
        a = 0.1;
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function getColor() {
    if (colorMode == "erase") {
        return "white";
    } else if (colorMode == "rainbow") {
        return getRandomColor();
    }
    if (shade.checked) {
        return hexToRGB(document.querySelector("#colorPicker").value, 0.1);
    }
    return document.querySelector("#colorPicker").value;
}


function createSketchpad(p) {

    const sketchPad = document.querySelector(".sketchPad");
    //delete previosly added pixels to the sketchpad
    document.querySelectorAll(".pixel").forEach((p) => {
        sketchPad.removeChild(p);
    });


    const pixelCount = p;
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

    //function to set the background of the pixels
    function colorPixel(e) {
        if (mouseDown) e.target.style.cssText = `background-color: ${getColor()}`;
    }

    //adding event listeners to the pixels

    pixels.forEach (pixel => {
        pixel.addEventListener("mousedown", (e) => {
            e.target.style.cssText = `background-color: ${getColor()}`;
        });
        pixel.addEventListener("mouseover", colorPixel);
    });
}


//setups the inital sketchpad
createSketchpad(pixelCount);


//clears the sketchpad if the clear button is pressed 
const clear = document.querySelector("#clear");
clear.addEventListener("click", (e) => {
    colorMode = "black";
    createSketchpad(pixelCount);
});


//functions to change the color of pen when rainbow, erase buttons 
//are pressed 
const colorModes = document.querySelectorAll("*[data-color]");
console.log(colorModes);
colorModes.forEach((mode) => {
    mode.addEventListener("click", (e) => {
        colorMode = (e.target.dataset.color);
    })
});


//variable that toggles between true and false
//const colorShade = document.querySelector("#shade");
//colorShade.addEventListener("click", (e) => {
//    shade = shade ? false : true;
//});

const colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("input", (e) => {
    colorMode = "none";
});

