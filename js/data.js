import {getRandomPositiveInteger, getRandomPositiveFloat, createRandomNumberRangeGenerator, pad, getRandomArrayElement} from './util.js';

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


const generateAuthorImg = (createRandomNumberRangeGenerator(1, 10));
const generatePrice = (createRandomNumberRangeGenerator(1000, 10000));


const createAuthor = () => ({
  avatar: `img/avatars/user${pad(generateAuthorImg(), 2)}.png`
});

const authors = () => Array.from({length: 10}, createAuthor);


const latFloat = getRandomPositiveFloat(UPPER_LAT,DOWN_LAT,FLOATING_POINT);
const lngFloat = getRandomPositiveFloat(UPPER_LNG,DOWN_LNG,FLOATING_POINT);

const createLocation = () => ({
  lat: latFloat,
  lng: lngFloat,
});

const randomLocations = () => Array.from({length: 10}, createLocation);


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

const offers = () => Array.from({length: 10}, createOffers);


export {authors, randomLocations, offers};
