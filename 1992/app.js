// Stopwatch logic
let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapTimes = [];

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

// Function to format time as HH:MM:SS
function formatTime() {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Update time display
function updateDisplay() {
    timeDisplay.textContent = formatTime();
}

// Start the stopwatch
function startStopwatch() {
    timer = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
        updateDisplay();
    }, 1000);
}

// Start/Stop button click
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startStopwatch();
        startBtn.textContent = 'Stop';
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    } else {
        clearInterval(timer);
        isRunning = false;
        startBtn.textContent = 'Start';
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
});

// Pause button click
pauseBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = 'Start';
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
});

// Reset button click
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapTimes = [];
    updateDisplay();
    lapList.innerHTML = '';
    startBtn.textContent = 'Start';
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
});

// Lap button click
lapBtn.addEventListener('click', () => {
    lapTimes.push(formatTime());
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTimes[lapTimes.length - 1]}`;
    lapList.appendChild(lapItem);
});
