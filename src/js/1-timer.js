import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Icon from '../img/symbol-defs.svg';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysFp = document.querySelector('span[data-days]');
const hoursFp = document.querySelector('span[data-hours]');
const minutesFp = document.querySelector('span[data-minutes]');
const secondsFp = document.querySelector('span[data-seconds]');

let userSelectedDate = 0;
let intervalId = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const date = Date.now();

    if (userSelectedDate.getTime() < date) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: 'white',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: Icon,
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const fp = flatpickr(input, options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(evt) {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    let delta = userSelectedDate.getTime() - currentTime;
    convertMs(delta);

    input.disabled = true;
    startBtn.disabled = true;
    if (delta <= 1000) {
      clearInterval(intervalId);
      input.disabled = false;
      startBtn.disabled = false;
      return;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  updateData({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateData({ days, hours, minutes, seconds }) {
  daysFp.textContent = days;
  hoursFp.textContent = hours;
  minutesFp.textContent = minutes;
  secondsFp.textContent = seconds;
}
