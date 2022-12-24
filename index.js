//data-type active, and passive => 25:00 and 5:00
import { toggleSettingsForm } from './src/customizeTimer.js';
import globalContext from './src/globalContext.js';
import { Timer } from './src/Timer.js';
const showSettingsBtn = document.querySelector('.pomodoro-timer-settings-btn');
const timerActionBtn = document.querySelector('.actions-btn');
const resetBtn = document.querySelector('.reset-btn');

const timerStartStop = () => {
  //object distructuring, DOMStringMap {action: 'start'} as in html(data-action)
  const { action } = timerActionBtn.dataset;
  if (action === 'stop') {
    globalContext.timer.stopTimer();
  }
  if (action === 'start') {
    globalContext.timer.startTimer();
  }
};

const resetTimer = () => {
  globalContext.timer.reset();
};

const createInitialTimer = (workTime, breakTime) => {
  const workTimeInput = document.querySelector('#work-duration');
  const breakTimeInput = document.querySelector('#break-duration');
  workTimeInput.value = workTime;
  breakTimeInput.value = breakTime;
  globalContext.timer = new Timer(workTime, breakTime);
  globalContext.timer.displaySettings();
};

const existTimer = JSON.parse(
  localStorage.getItem(globalContext.localStorageName)
);
if (existTimer) {
  createInitialTimer(existTimer.work / 60, existTimer.break / 60);
} else {
  createInitialTimer(1, 2);
}

timerActionBtn.addEventListener('click', timerStartStop);
resetBtn.addEventListener('click', resetTimer);
showSettingsBtn.addEventListener('click', toggleSettingsForm);
