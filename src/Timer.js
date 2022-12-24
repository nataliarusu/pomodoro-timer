import globalContext from './globalContext.js';

const timerContainer = document.querySelector('.pomodoro-timer-time');
const timerStartStopBtn = document.querySelector('.actions-btn');
const minutesEl = timerContainer.querySelector('.minutes');
const secondsEl = timerContainer.querySelector('.seconds');
const displaySettingsEl = document.querySelector('.about-pomodoro-timer');
const currentModeDisplayEl = document.querySelector('.current-mode');
const sound = new Audio('./alarm.mp3');
export class Timer {
  constructor(workTime, breakTime) {
    this.work = Number(workTime) * 60; //work time in seconds
    this.break = Number(breakTime) * 60; //break time in seconds
    this.remainTime = this.work;
    this.elapsedTime = 0; // end time - start time
    this.interval;
    this.currentMode = 'work';
    this.renderTimer();
  }
  displaySettings() {
    displaySettingsEl.textContent = `Work Time Length ${
      this.work / 60
    }:00 min / Break Time Length ${this.break / 60}:00 min`;
    localStorage.setItem(globalContext.localStorageName, JSON.stringify(this));
  }
  renderTimer() {
    const minutes = Math.trunc(this.remainTime / 60);
    const seconds = this.remainTime % 60;
    minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
  }
  updateTime() {
    this.remainTime = this[this.currentMode] - this.elapsedTime; //elapsed time updated in interval
    this.renderTimer();
    currentModeDisplayEl.textContent = this.currentMode.toUpperCase();
    if (this.remainTime === 4) {
      sound.play();
    }
    if (this.remainTime === 0) {
      if (this.currentMode === 'work') {
        this.currentMode = 'break';
        timerContainer.dataset.type = this.currentMode;
        this.remainTime = this.break;
        currentModeDisplayEl.classList.remove('work');
        currentModeDisplayEl.classList.add('break');
      } else {
        this.currentMode = 'work';
        timerContainer.dataset.type = this.currentMode;
        this.remainTime = this.work;
        currentModeDisplayEl.classList.remove('break');
        currentModeDisplayEl.classList.add('work');
      }
      clearInterval(this.interval);
      this.elapsedTime = 0;
      this.startTimer();
    }
  }
  stopTimer() {
    clearInterval(this.interval);
    timerStartStopBtn.dataset.action = 'start';
    timerStartStopBtn.textContent = 'START';
    timerStartStopBtn.classList.remove('active');
  }
  startTimer() {
    timerStartStopBtn.dataset.action = 'stop';
    timerStartStopBtn.textContent = 'STOP';
    timerStartStopBtn.classList.add('active');
    const startTime = Math.round(Date.now() / 1000) - this.elapsedTime;
    this.interval = setInterval(() => {
      this.elapsedTime = Math.round(Date.now() / 1000) - startTime;
      this.updateTime();
    }, 1000);
  }
  reset() {
    clearInterval(this.interval);
    this.elapsedTime = 0;
    this.remainTime = this[this.currentMode];
    this.renderTimer();
    if (timerStartStopBtn.classList.contains('active')) {
      this.startTimer();
    }
  }
}
