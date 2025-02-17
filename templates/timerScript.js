document.addEventListener("DOMContentLoaded", () => {
    const timeDisplay = document.getElementById("time");
    const startButton = document.getElementById("start");
    const resetButton = document.getElementById("reset");
    const intervalsInput = document.getElementById("intervals");
    const setsInput = document.getElementById("sets");
    const circle = document.querySelector(".progress-ring__circle");
    const circumference = 314;
    circle.style.strokeDasharray = circumference;

    let intervals = [];
    let sets = 1;
    let currentIntervalIndex = 0;
    let currentSet = 0;
    let timeRemaining = 0;
    let totalTime = 0;
    let timer;

    function startTimer(duration) {
        timeRemaining = duration * 60;
        totalTime = timeRemaining;
        updateDisplay();
        timer = setInterval(() => {
            timeRemaining--;
            updateDisplay();
            if (timeRemaining <= 0) {
                clearInterval(timer);
                nextInterval();
            }
        }, 1000);
    }

    function updateDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        const progress = timeRemaining / totalTime;
        circle.style.strokeDashoffset = circumference * (1 - progress);
    }

    function nextInterval() {
        currentIntervalIndex++;
        if (currentIntervalIndex >= intervals.length) {
            currentIntervalIndex = 0;
            currentSet++;
            if (currentSet >= sets) {
                return;
            }
        }
        startTimer(intervals[currentIntervalIndex]);
    }

    startButton.addEventListener("click", () => {
        intervals = intervalsInput.value.split(",").map(Number);
        sets = Number(setsInput.value);
        currentIntervalIndex = 0;
        currentSet = 0;
        startTimer(intervals[currentIntervalIndex]);
    });

    resetButton.addEventListener("click", () => {
        clearInterval(timer);
        timeDisplay.textContent = "00:00";
        circle.style.strokeDashoffset = circumference;
    });
});
