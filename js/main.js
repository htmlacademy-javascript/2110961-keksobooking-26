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

const UPPER_LAT = 35.65;
const DOWN_LAT = 35.70;
const UPPER_LNG = 139.7;
const DOWN_LNG = 139.8;

const FLOATING_POINT= 5;

const UPPER_HOUR = 2;
const DOWN_HOUR = 4;


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


const latFloat = getRandomPositiveFloat(UPPER_LAT,DOWN_LAT,FLOATING_POINT);
const lngFloat = getRandomPositiveFloat(UPPER_LNG,DOWN_LNG,FLOATING_POINT);

const createLocation = () => ({
  lat: latFloat,
  lng: lngFloat,
});

const randomLocation = Array.from({length: 10}, createLocation);


const randomFeatures = () => ROOM_FEATURES.filter(() => getRandomPositiveInteger (0, 1));
const randomPhotos = () => ROOM_PHOTOS.filter(() => getRandomPositiveInteger (0, 1));


const checkInTimer = (hour) => `1${hour}:00`;

const checkOutTimer = (hour) => `1${hour}:00`;

const createOffers = () => {
  const hourIn = getRandomPositiveInteger(UPPER_HOUR, DOWN_HOUR);
  const hourOut = getRandomPositiveInteger(hourIn, DOWN_HOUR);

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

