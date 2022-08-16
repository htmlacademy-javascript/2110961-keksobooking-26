import { author } from './data.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAuthor = author();

const collectionCard = (offer, i) => {
  const exibitionElement = cardTemplate.cloneNode(true);
  if (offer.title === undefined) {
    exibitionElement.querySelector('.popup__title').remove();
  } else {
    exibitionElement.querySelector('.popup__title').textContent = offer.title;
  }

  if (similarAuthor[i].avatar === undefined) {
    exibitionElement.querySelector('.popup__avatar').remove();
  }
  exibitionElement.querySelector('.popup__avatar').src = similarAuthor[i].avatar;

  exibitionElement.querySelector('.popup__description').textContent = offer.description;
  const photoPlace = exibitionElement.querySelector('.popup__photos');
  photoPlace.innerHTML = '';

  offer.photos.forEach((element) => {
    const img = new Image(45, 40);
    img.src = element;
    return photoPlace.append(img);
  });
  exibitionElement.querySelector('.popup__text--address').textContent = offer.address;

  const exibitionType = offer.type;
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
  offer.features.forEach((element) => {
    const featuresListItem = document.createElement('li');
    featuresListItem.classList.add('popup__feature');
    featuresListItem.classList.add(`popup__feature--${element}`);
    featuresContainer.append(featuresListItem);
  });

  exibitionElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  exibitionElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  exibitionElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  return exibitionElement;
};

export { collectionCard };


