
const advertFormElement = document.querySelector('.ad-form');
const headerFormElement = advertFormElement.querySelector('fieldset.ad-form-header');
const uloadRoomElement = advertFormElement.querySelector('.ad-form__input');
const fildsetFormElements = advertFormElement.querySelectorAll('.ad-form__element');

const mapFilterElement = document.querySelector('.map__filters');
const mapFilterSelectElements = mapFilterElement.querySelectorAll('.map__filter');
const mapCheckboxSelectElements = mapFilterElement.querySelectorAll('.map__checkbox');


const disableForms = () => {
  advertFormElement.classList.add('ad-form--disabled');
  mapFilterElement.classList.add('ad-form--disabled');
  headerFormElement.disabled = true;
  uloadRoomElement.disabled = true;
  fildsetFormElements.forEach((item) => item.disabled = true);
  mapFilterSelectElements.forEach((item) => item.disabled = true);
  mapCheckboxSelectElements.forEach((item) => item.disabled = true);
};


const enableForms = () => {
  advertFormElement.classList.remove('ad-form--disabled');
  mapFilterElement.classList.remove('ad-form--disabled');
  headerFormElement.disabled = false;
  uloadRoomElement.disabled = false;
  fildsetFormElements.forEach((item) => item.disabled = false);
  mapFilterSelectElements.forEach((item) => item.disabled = false);
  mapCheckboxSelectElements.forEach((item) => item.disabled = false);
};


export {disableForms, enableForms};
