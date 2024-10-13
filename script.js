const colorBoxes = document.querySelectorAll('.color-box');
const startButton = document.getElementById('start-btn');
const messageDisplay = document.getElementById('message');

const colors = ['green', 'red', 'yellow', 'blue'];
let sequence = [];
let playerSequence = [];
let level = 0;

startButton.addEventListener('click', startGame);

function startGame() {
    level = 0;
    sequence = [];
    nextSequence();
}

function nextSequence() {
    playerSequence = [];
    level++;
    messageDisplay.textContent = `Level ${level}`;
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    
    playSequence();
}

function playSequence() {
    let index = 0;
    const interval = setInterval(() => {
        const color = sequence[index];
        flashColor(color);
        index++;
        if (index >= sequence.length) {
            clearInterval(interval);
        }
    }, 1000);
}

function flashColor(color) {
    const box = document.getElementById(color);
    box.style.opacity = 1;
    setTimeout(() => {
        box.style.opacity = 0.6;
    }, 500);
}

colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const color = box.id;
        playerSequence.push(color);
        flashColor(color);
        checkSequence(playerSequence.length - 1);
    });
});

function checkSequence(index) {
    if (playerSequence[index] !== sequence[index]) {
        messageDisplay.textContent = 'Wrong! Game Over. Click "Start Game" to try again.';
        startButton.disabled = false;
    } else if (playerSequence.length === sequence.length) {
        startButton.disabled = true;
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
}
