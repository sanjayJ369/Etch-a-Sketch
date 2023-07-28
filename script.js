
let pixelCount = 10;
let colorMode = "black";
const shade = document.querySelector("#shade");


//function to convert hex into rgba
function hexToRGB(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16),
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
    
    return `rgb(${r}, ${g}, ${b})`;
}

//function that convertes rgb or rgba 
//into rgba and adds some alpha to it
function addAlpha(rgb, alpha=0.1) {

    if (rgb.slice(0, 4) == "rgb(") {
        let rgba = rgb.replace("rgb", "rgba")
        return (rgba.replace(")", `, ${alpha})`));
    } else {
        let rgba = rgb.split(",");
        let r = parseInt(rgba[0].replace("rgba(", "")),
        g = parseInt(rgba[1]),
        b = parseInt(rgba[2]),
        a = parseFloat(rgba[3].replace(")", ""));
        
        a += alpha;
        if (a >= 1) a = 0.9;

        console.log(r, g, b, a);

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}

function getColor(p) {

    if (colorMode == "erase") {
        return "white";
    } else if (shade.checked) {

        /*
            if the pixel does not have any background color i.e it's 
            color is white add shade of the color present in the 
            color picker

            if the colorMode is rainbow and it does not have any background 
            color get random color and add alpha to it


        */
        if (colorMode == "rainbow" && !p.style.backgroundColor) {
            let randColor = getRandomColor();
            console.log(addAlpha(randColor));
            return addAlpha(randColor);
        } 

        if (!p.style.backgroundColor) {
            return (addAlpha(hexToRGB(document.querySelector("#colorPicker").value)));
        }
        
        if (p.style.backgroundColor) {
            if (p.style.backgroundColor.slice(0, 4) == "rgba") {
                return addAlpha(p.style.backgroundColor);
            }
        }
        //return (addAlpha(hexToRGB(document.querySelector("#colorPicker").value)));
    } else if (colorMode == "rainbow") {
        return getRandomColor();
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
        if (mouseDown) e.target.style.cssText = `background-color: ${getColor(e.target)}`;
    }

    //adding event listeners to the pixels

    pixels.forEach (pixel => {
        pixel.addEventListener("mousedown", (e) => {
            e.target.style.cssText = `background-color: ${getColor(e.target)}`;
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



const colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("input", (e) => {
    colorMode = "none";
});
colorPicker.addEventListener("click", (e) => {
    colorMode = "none";
})

