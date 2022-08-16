const FIRST_HEADER_LENGTH = 30;
const SECOND_HEADER_LENGTH = 100;
const MAX_PRICE_NIGHT = 100000;


const advertFormElement = document.querySelector('.ad-form');
const headerFormElement = advertFormElement.querySelector('fieldset.ad-form-header');
const uloadRoomElement = advertFormElement.querySelector('.ad-form__input');
const fildsetFormElements = advertFormElement.querySelectorAll('.ad-form__element');

const mapFilterElement = document.querySelector('.map__filters');
const mapFilterSelectElements = mapFilterElement.querySelectorAll('.map__filter');
const mapCheckboxSelectElements = mapFilterElement.querySelectorAll('.map__checkbox');

const fildTimeInElement = advertFormElement.querySelector('[name="timein"]');
const fildTimeOutElement = advertFormElement.querySelector('[name="timeout"]');


fildTimeInElement.addEventListener('change', () => {
  switch (fildTimeInElement.value) {
    case '12:00':
      fildTimeOutElement.value = '12:00';
      break;
    case '13:00':
      fildTimeOutElement.value = '13:00';
      break;
    case '14:00':
      fildTimeOutElement.value = '14:00';
      break;
  }
});

fildTimeOutElement.addEventListener('change', () => {
  switch (fildTimeOutElement.value) {
    case '12:00':
      fildTimeInElement.value = '12:00';
      break;
    case '13:00':
      fildTimeInElement.value = '13:00';
      break;
    case '14:00':
      fildTimeInElement.value = '14:00';
      break;
  }
});

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


advertFormElement.addEventListener('submit', (e) => {

  const isValid = pristine.validate();
  if (!isValid) {
    e.preventDefault();
  }
});

const disableForms = () => {
  advertFormElement.classList.add('ad-form--disabled');
  mapFilterElement.classList.add('ad-form--disabled');
  headerFormElement.disabled = true;
  uloadRoomElement.disabled = true;
  fildsetFormElements.forEach((item) => item.disabled = true);
  mapFilterSelectElements.forEach((item) => item.disabled = true);
  mapCheckboxSelectElements.forEach((item) => item.disabled = true);
};

disableForms();

const enableForms = () => {
  advertFormElement.classList.remove('ad-form--disabled');
  mapFilterElement.classList.remove('ad-form--disabled');
  headerFormElement.disabled = false;
  uloadRoomElement.disabled = false;
  fildsetFormElements.forEach((item) => item.disabled = false);
  mapFilterSelectElements.forEach((item) => item.disabled = false);
  mapCheckboxSelectElements.forEach((item) => item.disabled = false);
};


export { disableForms, enableForms };
