const { error } = require('@pnotify/core');
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
var debounce = require('lodash');
import fetchCountries from './fetchCountries';
import listTemplate from '../templates/country_list.hbs';
import infoTemplate from '../templates/country_full_info.hbs';

const listRef = document.querySelector('.js-list');
const infoRef = document.querySelector('.country_info');
const inputRef = document.querySelector('#cname');

function clearHTML(){
  listRef.innerHTML = '';
  infoRef.innerHTML = '';
};
function checkResponse(data){
  clearHTML()
  if(data.length>9){
    const myError = error({
      text: "Too many matches found. Please enter a more specific query!"
    });
  }else if(data.length>=2 && data.length<=9){
    listRef.insertAdjacentHTML('beforeend', listTemplate(data));
  }else if(data.length===1){
    infoRef.insertAdjacentHTML('beforeend', infoTemplate(data));
  }
};

const debouncedOnInput = _.debounce(event=>{
  let countryNameInput = event.target.value;
  if(!countryNameInput){clearHTML()};
  fetchCountries(countryNameInput).then(data=>checkResponse(data));
  },500);

inputRef.addEventListener('input', debouncedOnInput);
