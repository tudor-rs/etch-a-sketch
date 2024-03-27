// to do: add lighten mode / darken mode via string manipulation

const CONTAINER = document.querySelector('#container');
const CONTAINER_WIDTH = CONTAINER.clientWidth;
const CONTAINER_HEIGHT = CONTAINER.clientHeight;
const INCREASE_SIZE_BUTTON = document.querySelector('#increase-size');
const DECREASE_SIZE_BUTTON = document.querySelector('#decrease-size');
const SIZE_DISPLAY = document.querySelector('#current-size-display');
const CLEAR_BUTTON = document.querySelector('#clear-button');
const RAINBOW_MODE = document.querySelector('#rainbow-mode');

let gridSize = 32;
let currentColor = `rgb(0, 0, 0)`;
let rainbowMode = false;

CLEAR_BUTTON.addEventListener('click', () => {
    clearEverything();
});

INCREASE_SIZE_BUTTON.addEventListener('click', () => {
    let tempSize = gridSize * 2;
    if (tempSize <= 64) {
        gridSize = tempSize;
        clearEverything();
    }

    else if (tempSize > 64) {
        console.log('cannot increase size any more');
    }
});

DECREASE_SIZE_BUTTON.addEventListener('click', () => {
    let tempSize = gridSize / 2;
    if (tempSize >= 16) {
        gridSize = tempSize;
        clearEverything();
    }

    else if (tempSize < 16) {
        console.log('cannot decrease size any more');
    }
});

RAINBOW_MODE.addEventListener('click', () => {
    rainbowMode = !rainbowMode;
    rainbowMode ? RAINBOW_MODE.classList.add('rainbowActive') :
    RAINBOW_MODE.classList.remove('rainbowActive');
});

function drawGrid() {
    for (let i = 0; i < gridSize ** 2; i++) {

        let square = document.createElement('div');
        square.className = 'square';
        square.style.width = CONTAINER_WIDTH / gridSize + 'px';
        square.style.height = CONTAINER_HEIGHT / gridSize + 'px';
        CONTAINER.appendChild(square);

        square.addEventListener('mouseover', (e) => {
            if (e.buttons == 1) {
                if (rainbowMode) {
                    let randomColor = getRandomColor();
                    square.style.backgroundColor = randomColor;
                }

                else {
                    square.style.backgroundColor = currentColor;
                }                
            }
        });
    }

    SIZE_DISPLAY.textContent = gridSize;
}

function clearEverything() {
    for (let i of document.querySelectorAll('div')) {
        if (i.className == 'square') {
            i.remove();
        }
    }
    drawGrid();
}

function getRandomColor() {
    return (`rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 255);
}

drawGrid();