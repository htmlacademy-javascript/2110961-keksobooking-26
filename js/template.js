const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const collectionCard = (advert) => {
  const exibitionElement = cardTemplate.cloneNode(true);
  if (advert.offer.title === undefined) {
    exibitionElement.querySelector('.popup__title').remove();
  } else {
    exibitionElement.querySelector('.popup__title').textContent = advert.offer.title;
  }

  if (advert.author.avatar === undefined) {
    exibitionElement.querySelector('.popup__avatar').remove();
  }
  exibitionElement.querySelector('.popup__avatar').src = advert.author.avatar;

  exibitionElement.querySelector('.popup__description').textContent = advert.offer.description;
  const photoPlace = exibitionElement.querySelector('.popup__photos');
  photoPlace.innerHTML = '';

  if (advert.offer.photos === undefined) {
    exibitionElement.querySelector('.popup__photos').remove();
  } else {
    advert.offer.photos.forEach((element) => {
      const img = new Image(45, 40);
      img.src = element;
      photoPlace.append(img);
    });
  }

  exibitionElement.querySelector('.popup__text--address').textContent = advert.offer.address;

  const exibitionType = advert.offer.type;
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

  if (advert.offer.features === undefined) {
    exibitionElement.querySelector('.popup__features').remove();
  } else {
    featuresContainer.innerHTML = '';
    advert.offer.features.forEach((element) => {
      const featuresListItem = document.createElement('li');
      featuresListItem.classList.add('popup__feature');
      featuresListItem.classList.add(`popup__feature--${element}`);
      featuresListItem.classList.add(`popup__feature--${advert.offer.features}`);
      featuresContainer.append(featuresListItem);
    });
  }

  exibitionElement.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  exibitionElement.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  exibitionElement.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  return exibitionElement;
};

export { collectionCard };


