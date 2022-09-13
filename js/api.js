import { enableForms, showAlert } from './form.js';
import {  turnFilterOff, turnFilterOn, setDataLoaded, getMapLoaded} from './script.js';


const URL_POST_ADVERT = 'https://26.javascript.pages.academy/keksobooking/';
const URL_GET_ADVERTS = 'https://26.javascript.pages.academy/keksobooking/data/';
const TXT_FORM_UPLOAD_ERROR = 'Не удалось загрузить объявления';

const sendButton = document.querySelector('.ad-form__submit');

const getData = (advertsView) => {
  turnFilterOff();
  fetch(URL_GET_ADVERTS)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((getAdverts) => {
      if (getMapLoaded()) {
        enableForms();
      }
      setDataLoaded();
      advertsView(getAdverts);
      turnFilterOn(getAdverts);
    })
    .catch(() => {showAlert(TXT_FORM_UPLOAD_ERROR);
    });
};

const sendData = (sendResult, sendFail, body) => {
  sendButton.disabled = true;
  fetch(
    URL_POST_ADVERT,
    {
      method: 'POST',
      body,
    },

  )
    .then((response) => {
      sendButton.disabled = false;
      if (response.ok) {
        sendResult('success');
      } else {
        sendResult('error');
      }
    })
    .catch(() => {
      sendFail();
    });
};


export { getData, sendData };
