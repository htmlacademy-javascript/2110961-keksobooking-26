

import { collectionCard } from './template.js';
import { enableForms } from './form.js';
import { debounce } from './util.js';

const TOKYO_LAT = 35.6895;
const TOKYO_LNG = 139.692;

const SIMILAR_ADVERTS_COUNT = 10;

const Price = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const fieldAddressElement = document.querySelector('[name="address"]');

const filterFormElement = document.querySelector('.map__filters');
const housingTypeElement = filterFormElement.querySelector('[name="housing-type"]');
const housingPriceElement = filterFormElement.querySelector('[name="housing-price"]');
const housingRoomsElement = filterFormElement.querySelector('[name="housing-rooms"]');
const housingGuestsElement = filterFormElement.querySelector('[name="housing-guests"]');
const featureCheckboxesElement = filterFormElement.querySelectorAll('[name="features"]');


let mapLoaded = false;
let dataLoaded = false;

let offers = [];
const setDataLoaded = () => dataLoaded = true;
const getMapLoaded = () => mapLoaded;

const turnFilterOff = () => {
  filterFormElement.classList.add('map__filters--disabled');
  [...filterFormElement.children].forEach((filter) => {
    filter.disabled = true;
  });
};

const turnFilterOn = (data) => {
  offers = data;
  filterFormElement.classList.remove('map__filters--disabled');
  [...filterFormElement.children].forEach((filter) => {
    filter.disabled = false;
  });
  setOnFilterChange(advertsView(offers))
};

const filterByType = (offer, type) =>
  type === 'any' || offer.offer.type === type;

const filterByPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < Price.MIDDLE;
    case 'middle':
      return (
        offer.offer.price < Price.HIGH && offer.offer.price >= Price.MIDDLE
      );
    case 'high':
      return offer.offer.price >= Price.HIGH;
  }
};

const filterByRooms = (offer, rooms) =>
  rooms === 'any' || offer.offer.rooms === +rooms;

const filterByGuests = (offer, guests) =>
  guests === 'any' || offer.offer.guests === Number(guests);

const filterByFeauteres = (offer, features) =>
  features.every((feature) =>
    offer.offer.features?.includes(feature)
  );


const filterOffers = (offers) => {
  const selectedType = housingTypeElement.value;
  const selectedPrice = housingPriceElement.value;
  const selectedRooms = housingRoomsElement.value;
  const selectedGuests = housingGuestsElement.value;

  const selectedFeatures = [];
  featureCheckboxesElement.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });

  const filteredOffers = [];
  for (const offer of offers) {
    if (filteredOffers.length >= SIMILAR_ADVERTS_COUNT) {
      break;
    }

    if (
      filterByType(offer, selectedType) &&
      filterByPrice(offer, selectedPrice) &&
      filterByRooms(offer, selectedRooms) &&
      filterByGuests(offer, selectedGuests) &&
      filterByFeauteres(offer, selectedFeatures)
    ) {
      filteredOffers.push(offer);
    }
  }
  return filteredOffers;
}



const map = L.map('map-canvas')
  .on('load', () => {
    if (dataLoaded) {
      enableForms()
    };
    mapLoaded = true;
  })
  .setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);



mainPinMarker.addTo(map);

fieldAddressElement.value = `Lat ${TOKYO_LAT} Lng ${TOKYO_LNG}`;

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  fieldAddressElement.value = `Lat ${lat.toFixed(6)} Lng ${lng.toFixed(6)}`;
});


const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});



const markerGroup = L.layerGroup().addTo(map);

const advertsView = (adverts) => {
  markerGroup.clearLayers();
  filterOffers(adverts)
    .forEach((advert) => {
      const { lat } = advert.location;
      const { lng } = advert.location;
      const marker = L.marker({
        lat,
        lng,
      },
        {
          icon,
        },
      );

      marker.addTo(markerGroup)
        .bindPopup(collectionCard(advert));
    });
};

const setOnFilterChange = (cb) => {
  filterFormElement.addEventListener('change',
    debounce(() => advertsView(offers))
  );
};

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  });
  map.setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 13);
  map.closePopup();
};


export { advertsView, resetMap, setOnFilterChange, turnFilterOn, turnFilterOff, setDataLoaded, getMapLoaded };
