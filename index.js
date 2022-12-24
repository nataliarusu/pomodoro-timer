//data-type active, and passive => 25:00 and 5:00
import { toggleSettingsForm } from './src/customizeTimer.js';
import globalContext from './src/globalContext.js';
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
  console.log(timerActionBtn.dataset);
};

const resetTimer=()=>{
  globalContext.timer.reset();  
}
timerActionBtn.addEventListener('click', timerStartStop);
resetBtn.addEventListener('click', resetTimer);
showSettingsBtn.addEventListener('click', toggleSettingsForm);
