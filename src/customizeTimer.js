import { Timer } from "./Timer.js";
import globalContext from "./globalContext.js";
const formContainer = document.querySelector('.customize-pomodoro-container');
const form = document.querySelector('#customize-pomodoro-form');


const customizeTimerHandler = (e)=>{
    e.preventDefault();
    const work_duration = e.target.querySelector('#work-duration').value;
    const break_duration = e.target.querySelector('#break-duration').value;
    globalContext.timer.stopTimer();
    globalContext.timer = new Timer(work_duration, break_duration); 
    console.log(globalContext.timer)
}

export const toggleSettingsForm=()=>{
    formContainer.classList.toggle('visible');
  }

form.addEventListener('submit', customizeTimerHandler);