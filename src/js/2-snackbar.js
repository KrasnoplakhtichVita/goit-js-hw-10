import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import IconRight from '../img/right.svg';
import IconWrong from '../img/symbol-defs.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', onBtnClick);

function onBtnClick(evt) {
  evt.preventDefault();
  if (!evt.target.nodeName === 'BUTTON') {
    return;
  }
  createPromises()
    .then(value =>
      iziToast.show({
        message: value,
        theme: 'light',
        messageColor: 'white',
        messageSize: '16',
        color: '#59a10d',
        position: 'topRight',
        iconUrl: IconRight,
      })
    )
    .catch(error =>
      iziToast.show({
        message: error,
        theme: 'light',
        messageColor: 'white',
        messageSize: '16',
        color: '#ef4040',
        position: 'topRight',
        iconUrl: IconWrong,
      })
    );
}

function createPromises() {
  const delay = Number(form.delay.value);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (form.state.value === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  return promise;
}
