
import { sendData } from './api.js';
import { isEscapeKey } from './util.js';
import { resetMap } from './script.js';

const FIRST_HEADER_LENGTH = 30;
const SECOND_HEADER_LENGTH = 100;
const MAX_PRICE_NIGHT = 100000;
const TXT_CANT_SEND_FORM = 'Не удалось опубликовать объявление. Попробуйте ещё раз';
const ALERT_SHOW_TIME = 5000;

const body = document.body;
const advertFormElement = document.querySelector('.ad-form');
const headerFormElement = advertFormElement.querySelector('fieldset.ad-form-header');
const uloadRoomElement = advertFormElement.querySelector('.ad-form__input');
const fildsetFormElements = advertFormElement.querySelectorAll('.ad-form__element');
const resetButton = advertFormElement.querySelector('.ad-form__reset');

const mapFilterElement = document.querySelector('.map__filters');
const mapFilterSelectElements = mapFilterElement.querySelectorAll('.map__filter');
const mapCheckboxSelectElements = mapFilterElement.querySelectorAll('.map__checkbox');

const fieldTimeInElement = advertFormElement.querySelector('[name="timein"]');
const fieldTimeOutElement = advertFormElement.querySelector('[name="timeout"]');
const fieldAdressElement = advertFormElement.querySelector('[name="address"]');

const messageSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const messageErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');


const messageSuccess = messageSuccessTemplate.cloneNode(true);
const messageError = messageErrorTemplate.cloneNode(true);

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


const pristine = new Pristine(advertFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const roomsPriceField = advertFormElement.querySelector('[name="price"]');
const roomTypesField = advertFormElement.querySelector('[name="type"]');

const roomsField = advertFormElement.querySelector('[name="rooms"]');
const capacityField = advertFormElement.querySelector('[name="capacity"]');
const roomOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const roomPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const setLatLng = () => fieldAdressElement.value = 'Lat 35.6895 Lng 139.692';

const resetInputWhenSendOk = () => {
  advertFormElement.reset();
  setLatLng();
  resetMap();
};

const sendResult = (result) => {
  if (result === 'success') {
    resetInputWhenSendOk();
  }

  const onPopupMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      closePopup(result);
    }
  };
  const onPopupMessageClick = (evt) => {
    evt.stopPropagation();
    closePopup(result);
  };

  fieldTimeInElement.addEventListener('change', () => {
    switch (fieldTimeInElement.value) {
      case '12:00':
        fieldTimeOutElement.value = '12:00';
        break;
      case '13:00':
        fieldTimeOutElement.value = '13:00';
        break;
      case '14:00':
        fieldTimeOutElement.value = '14:00';
        break;
    }
  });

  fieldTimeOutElement.addEventListener('change', () => {
    switch (fieldTimeOutElement.value) {
      case '12:00':
        fieldTimeInElement.value = '12:00';
        break;
      case '13:00':
        fieldTimeInElement.value = '13:00';
        break;
      case '14:00':
        fieldTimeInElement.value = '14:00';
        break;
    }
  });


  function closePopup(item) {
    document.removeEventListener('keydown', onPopupMessageEscKeydown);
    document.removeEventListener('click', onPopupMessageClick);
    const sectionElement = document.querySelector(`.${item}`);
    sectionElement.remove();
  }

  body.appendChild(result === 'error' ? messageError : messageSuccess);
  document.addEventListener('keydown', onPopupMessageEscKeydown);
  document.addEventListener('click', onPopupMessageClick);
};

function validateRoomPrice() {
  return roomPrice[roomTypesField.value] <= roomsPriceField.value;
}

pristine.addValidator(roomsPriceField, validateRoomPrice,
  'Вы указали слишком низкую цену'
);

roomTypesField.addEventListener('input', () => {
  roomsPriceField.placeholder = `цена от ${roomPrice[roomTypesField.value]}`;
});


function validateRoom() {
  return roomOption[roomsField.value].includes(capacityField.value);
}

function getRoomsErrorMessage() {
  return `
    ${roomsField.querySelector('option:checked').textContent}
    ${roomsField.value === '1' ? 'не подходит' : 'не подходят'}
    ${capacityField.querySelector('option:checked').textContent}
  `;
}

pristine.addValidator(capacityField, validateRoom, getRoomsErrorMessage);

function validateHeader(value) {
  return value.length >= FIRST_HEADER_LENGTH && value.length <= SECOND_HEADER_LENGTH;
}

pristine.addValidator(advertFormElement.querySelector('#title'), validateHeader,
  'От 30 до 100 символов'
);

function validatePrice(value) {
  return value <= MAX_PRICE_NIGHT;
}

pristine.addValidator(advertFormElement.querySelector('#price'), validatePrice,
  'Максимальная цена 100000'
);

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  advertFormElement.reset();
  resetMap();
  setLatLng();
}
);

const enableForms = () => {
  advertFormElement.classList.remove('ad-form--disabled');
  mapFilterElement.classList.remove('ad-form--disabled');
  headerFormElement.disabled = false;
  uloadRoomElement.disabled = false;
  fildsetFormElements.forEach((item) => item.disabled = false);
  mapFilterSelectElements.forEach((item) => item.disabled = false);
  mapCheckboxSelectElements.forEach((item) => item.disabled = false);
};

const disableForms = () => {
  advertFormElement.classList.add('ad-form--disabled');
  mapFilterElement.classList.add('ad-form--disabled');
  headerFormElement.disabled = true;
  uloadRoomElement.disabled = true;
  fildsetFormElements.forEach((item) => item.disabled = true);
  mapFilterSelectElements.forEach((item) => item.disabled = true);
  mapCheckboxSelectElements.forEach((item) => item.disabled = true);
};

const sendFail = () => {
  showAlert(TXT_CANT_SEND_FORM);
};

const setUserFormSubmit = () => {
  advertFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        sendResult,
        sendFail,
        new FormData(evt.target),
      );
    }
  });
};

disableForms();


export { enableForms, disableForms, showAlert, setUserFormSubmit };
