import {author, offer} from './data.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarExibitions = offer();
const similarAuthor = author();

const randomExibitionFragment = document.createDocumentFragment();

const mapInputElement = document.querySelector('.map__canvas');


for (let i = 0; i< similarExibitions.length; i++) {
  const exibitionElement = cardTemplate.cloneNode(true);
  if (similarExibitions[i].title === undefined) {
    exibitionElement.querySelector('.popup__title').remove();
  } else {
    exibitionElement.querySelector('.popup__title').textContent = similarExibitions[i].title;}

  if (similarAuthor[i].avatar === undefined) {
    exibitionElement.querySelector('.popup__avatar').remove();
  }
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

  switch (exibitionType) {
    case 'flat':
      exibitionTypeRevert.textContent = 'Квартира';
      break;
    case 'bungalow':
      exibitionTypeRevert.textContent = 'Бунгало';
      break;
    case 'house':
      exibitionTypeRevert.textContent = 'Дом';
      break;
    case 'palace':
      exibitionTypeRevert.textContent = 'Дворец';
      break;
    case 'hotel':
      exibitionTypeRevert.textContent = 'Отель';
      break;
  }


  const featuresContainer = exibitionElement.querySelector('.popup__features');
  featuresContainer.innerHTML = '';
  similarExibitions[i].features.forEach((element) => {
    const featuresListItem = document.createElement('li');
    featuresListItem.classList.add('popup__feature');
    featuresListItem.classList.add(`popup__feature--${element}`);
    featuresContainer.append(featuresListItem);
  });

  exibitionElement.querySelector('.popup__text--price').textContent = `${similarExibitions[i].price} ₽/ночь`;
  exibitionElement.querySelector('.popup__text--capacity').textContent = `${similarExibitions[i].rooms} комнаты для ${similarExibitions[i].guests} гостей`;
  exibitionElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarExibitions[i].checkin}, выезд до ${similarExibitions[i].checkout}`;
  randomExibitionFragment.appendChild(exibitionElement);
}

//exebitionInputElement.appendChild(randomExibitionFragment.childNodes[1]);
