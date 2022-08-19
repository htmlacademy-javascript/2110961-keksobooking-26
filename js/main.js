import './template.js';
import { advertsView } from './script.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './form.js';

getData ((adverts) => {
  advertsView(adverts);
});

setUserFormSubmit();
