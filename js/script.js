

import { collectionCard } from './template.js';
import { enableForms } from './form.js';

const TOKYO_LAT = 35.6895;
const TOKYO_LNG = 139.692;

const fieldAddressElement = document.querySelector('[name="address"]');


const map = L.map('map-canvas')
  .on('load', () => {
    enableForms();
  })
  .setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 16);

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


const advertsView = (adverts) => {adverts.forEach((advert) => {
  const {lat} = advert.location;
  const {lng} = advert.location;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon,
  },
  );

  marker.addTo(map)
    .bindPopup(collectionCard(advert));
});
};

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  });
  map.setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 16);
  map.closePopup();
};


export { advertsView, resetMap};
