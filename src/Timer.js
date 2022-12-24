const timerContainer = document.querySelector('.pomodoro-timer-time');
const timerStartStopBtn = document.querySelector('.actions-btn');
const minutesEl = timerContainer.querySelector('.minutes');
const secondsEl = timerContainer.querySelector('.seconds');

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

  renderTimer() {
    const minutes = Math.trunc(this.remainTime / 60);
    const seconds = this.remainTime % 60;
    minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
  }

  updateTime() {
    this.remainTime = this[this.currentMode] - this.elapsedTime; //elapsed time updated in interval
    this.renderTimer();
    console.log(this.remainTime);
    if (this.remainTime === 0) {
      //sound here....
      if (this.currentMode === 'work') {
        console.log('switch');
        //change style, background, or call a method
        this.currentMode = 'break';
        timerContainer.dataset.type = this.currentMode;
        this.remainTime = this.break;
      } else {
        console.log('switch');
        //change style, background, or call a method
        this.currentMode = 'work';
        timerContainer.dataset.type = this.currentMode;
        this.remainTime = this.work;
      }
      clearInterval(this.interval);
      this.elapsedTime = 0;
      this.startTimer();
    }
  }

  stopTimer() {
    clearInterval(this.interval);
    timerStartStopBtn.dataset.action = 'start';
    timerStartStopBtn.textContent = 'start';
    timerStartStopBtn.classList.remove('active'); //remove active to container instead!
  }

  startTimer() {
    timerStartStopBtn.dataset.action = 'stop';
    timerStartStopBtn.textContent = 'stop';
    timerStartStopBtn.classList.add('active'); //add active to container instead!
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
