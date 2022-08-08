import {author, offer} from './data.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarExibitions = offer();
const similarAuthor = author();

const randomExibitionFragment = document.createDocumentFragment();

const exebitionInputElement = document.querySelector('.map__canvas');


for (let i = 0; i< similarExibitions.length; i++) {
  const exibitionElement = cardTemplate.cloneNode(true);
  exibitionElement.querySelector('.popup__title').textContent = similarExibitions[i].title;
  exibitionElement.querySelector('.popup__avatar').src = similarAuthor[i].avatar;
  exibitionElement.querySelector('.popup__description').textContent = similarExibitions[i].description;
  const photoPlace = exibitionElement.querySelector('.popup__photos');
  photoPlace.innerHTML = '';

  similarExibitions[i].photos.forEach((element) => {
    const img = new Image(45, 40);
    img.src = element;
    return photoPlace.append(img);
  });
  exibitionElement.querySelector('.popup__text--address').textContent = similarExibitions[i].address;

  const exibitionType = similarExibitions[i].type;
  const exibitionTypeRevert = exibitionElement.querySelector('.popup__type');

  if (exibitionType === 'flat') {
    exibitionTypeRevert.textContent = 'Квартира';
  }
  if (exibitionType === 'bungalow') {
    exibitionTypeRevert.textContent = 'Бунгало';
  }
  if (exibitionType === 'house') {
    exibitionTypeRevert.textContent = 'Дом';
  }
  if (exibitionType === 'palace') {
    exibitionTypeRevert.textContent = 'Дворец';
  }
  if (exibitionType === 'hotel') {
    exibitionTypeRevert.textContent = 'Отель';
  }

  const featuresContainer = exibitionElement.querySelector('.popup__features');
  featuresContainer.innerHTML = '';
  similarExibitions[i].features.forEach((element) => {
    const featuresListItem = document.createElement('li');
    featuresListItem.classList.add('popup__feature');
    featuresListItem.classList.add('popup__feature--' + element);
    featuresContainer.append(featuresListItem);
  });

  exibitionElement.querySelector('.popup__text--price').textContent = `${similarExibitions[i].price} ₽/ночь`;
  exibitionElement.querySelector('.popup__text--capacity').textContent = `${similarExibitions[i].rooms} комнаты для ${similarExibitions[i].guests} гостей`;
  exibitionElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarExibitions[i].checkin}, выезд до ${similarExibitions[i].checkout}`;
  randomExibitionFragment.appendChild(exibitionElement);
}

exebitionInputElement.appendChild(randomExibitionFragment.childNodes[1]);
