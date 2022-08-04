const ROOM_TITLE = [
  'Милая, уютная квартирка в центре Токио',
  'Квартира с видом на парк',
  'В новом доме с евроремонтом',
  'Квартира эконом класса',
  'Просторная квартира в кирпичном доме',
  'Небольшая но очень функциональная квартира',
];

const ROOM_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const ROOM_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const ROOM_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const ROOM_DESCRIPTION = [
  'Квартира после нового ремонта, в в самом центре, рядом все достопримечательности',
  'Отличная квартира в отличном состоянии в самом центре',
  'Новый дом, охрана, консьерж, просторная квартира в отличном состоянии, полностью укомплектована современной мебелью и техникой',
  'Новый элитный дом, огороженный, охрана, консьерж',
  'Прекрасная квартира в самом центре города, тихий двор',
  'Квартира в отличном состоянии (евро ремонт), с бытовой техникой',
];


function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (min, max, point) {
  const lower = (Math.min(Math.abs(min), Math.abs(max)));
  const upper = (Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(point);
}


function createRandomNumberRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function pad(num, size) {
  num = num.toString();
  while (num.length < size) {
    num = '0' + num;
  }
  return num;
}

const generateAuthorImg = (createRandomNumberRangeGenerator(1, 10));
const generatePrice = (createRandomNumberRangeGenerator(1000, 10000));


const createAuthor = () => ({
  avatar: `img/avatars/user${pad(generateAuthorImg(), 2)}.png`
});

const authors = Array.from({length: 10}, createAuthor);


const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];


const latFloat = getRandomPositiveFloat(35.65,35.70,5);
const lngFloat = getRandomPositiveFloat(139.7,139.8,5);

const createLocation = () => ({
  lat: getRandomPositiveFloat(35.65,35.70,5),
  lng: getRandomPositiveFloat(139.7,139.8,5),
});

const randomLocation = Array.from({length: 10}, createLocation);


const randomFeatures = () => ROOM_FEATURES.filter(() => getRandomPositiveInteger (0, 1));
const randomPhotos = () => ROOM_PHOTOS.filter(() => getRandomPositiveInteger (0, 1));


const checkInTimer = (hour) => `1${hour}:00`;

const checkOutTimer = (hour) => `1${hour}:00`;

const createOffers = () => {
  const hourIn = getRandomPositiveInteger(2, 4);
  const hourOut = getRandomPositiveInteger(hourIn, 4);

  return ({
    title: getRandomArrayElement(ROOM_TITLE),
    address: `location.${latFloat} location.${lngFloat}`,
    price: generatePrice (),
    type: getRandomArrayElement(ROOM_TYPE),
    rooms: getRandomPositiveInteger (1, 10),
    guests: getRandomPositiveInteger (1, 10),
    features: randomFeatures(),
    checkin: checkInTimer(hourIn),
    checkout: checkOutTimer(hourOut),
    photos: randomPhotos(),
    description: getRandomArrayElement(ROOM_DESCRIPTION),
  });
};

const offers = Array.from({length: 10}, createOffers);

