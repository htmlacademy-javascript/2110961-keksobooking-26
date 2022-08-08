import {getRandomPositiveInteger, getRandomPositiveFloat, createRandomNumberRangeGenerator, pad, getRandomArrayElement} from './util.js';

const ROOM_TITLES = [
  'Милая, уютная квартирка в центре Токио',
  'Квартира с видом на парк',
  'В новом доме с евроремонтом',
  'Квартира эконом класса',
  'Просторная квартира в кирпичном доме',
  'Небольшая но очень функциональная квартира',
];

const ROOM_TYPES = [
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

const ROOM_DESCRIPTIONS = [
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

const AUTHOR_START = 1;
const AUTHOR_END = 10;
const AUTHOR_NUMBERS_SIZE = 2;

const PRICE_START = 1000;
const PRICE_END = 10000;

const ARRAY_LENGTH = 10;

const ROOM_START = 1;
const ROOM_END = 10;

const GUEST_START = 1;
const GUEST_END = 10;

const FALSE_NUMBER = 0;
const TRUE_NUMBER = 1;


const generateAuthorImg = (createRandomNumberRangeGenerator(AUTHOR_START, AUTHOR_END));
const generatePrice = (createRandomNumberRangeGenerator(PRICE_START, PRICE_END));


const createAuthor = () => ({
  avatar: `img/avatars/user${pad(generateAuthorImg(), AUTHOR_NUMBERS_SIZE)}.png`
});

const author = () => Array.from({length: ARRAY_LENGTH}, createAuthor);


const latFloat = getRandomPositiveFloat(UPPER_LAT,DOWN_LAT,FLOATING_POINT);
const lngFloat = getRandomPositiveFloat(UPPER_LNG,DOWN_LNG,FLOATING_POINT);

const createLocation = () => ({
  lat: latFloat,
  lng: lngFloat,
});

const randomLocations = () => Array.from({length: ARRAY_LENGTH}, createLocation);


const randomFeatures = () => ROOM_FEATURES.filter(() => getRandomPositiveInteger (FALSE_NUMBER, TRUE_NUMBER));
const randomPhotos = () => ROOM_PHOTOS.filter(() => getRandomPositiveInteger (FALSE_NUMBER, TRUE_NUMBER));


const checkInTimer = (hour) => `1${hour}:00`;
const checkOutTimer = (hour) => `1${hour}:00`;

const createOffers = () => {
  const hourIn = getRandomPositiveInteger(UPPER_HOUR, DOWN_HOUR);
  const hourOut = getRandomPositiveInteger(hourIn, DOWN_HOUR);

  return ({
    title: getRandomArrayElement(ROOM_TITLES),
    address: `location.${latFloat} location.${lngFloat}`,
    price: generatePrice (),
    type: getRandomArrayElement(ROOM_TYPES),
    rooms: getRandomPositiveInteger (ROOM_START, ROOM_END),
    guests: getRandomPositiveInteger (GUEST_START, GUEST_END),
    features: randomFeatures(),
    checkin: checkInTimer(hourIn),
    checkout: checkOutTimer(hourOut),
    photos: randomPhotos(),
    description: getRandomArrayElement(ROOM_DESCRIPTIONS),
  });
};

const offer = () => Array.from({length: ARRAY_LENGTH}, createOffers);

export {author, randomLocations, offer};
