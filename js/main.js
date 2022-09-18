import './template.js';
import './avatar.js';
import { advertsView } from './map.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './form.js';

getData((adverts) => {
  advertsView(adverts);
});

setUserFormSubmit();
