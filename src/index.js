import { searchByName } from './fetchCountries';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inpEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

Notify.init({
  fontSize: '16px',
  width: '300px',
});

inpEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const query = evt.target.value.trim();

  if (!query) {
    listEl.innerHTML = '';
    divEl.innerHTML = '';
    return;
  }

  searchByName(query)
    .then(result => {
      if (result.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        listEl.innerHTML = '';
        divEl.innerHTML = '';
      } else if (result.length === 1) {
        renderCountryMarkup(result);

        listEl.innerHTML = '';
      } else if (result.length > 1 && result.length <= 10) {
        renderCountriesMarkup(result);

        divEl.innerHTML = '';
      }
    })
    .catch(() => {
      listEl.innerHTML = '';
      divEl.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountriesMarkup(countries) {
  const markup = countries
    .map(country => {
      return `
    <li class="country-list__item">
    <img class="country-list__flag" src="${country.flags.svg}" alt="${country.flags.alt}">
      <p class="country-list__name">${country.name.common}</p>
  </li>
  `;
    })
    .join('');
  listEl.innerHTML = markup;
}

function renderCountryMarkup(country) {
  const markup = country
    .map(country => {
      return `
    <div class="country-info__tumb">
     <img class="country-info__flag" src="${country.flags.svg}" alt="${
        country.flags.alt
      }" width="50">
     <p class="country-info__name title">${country.name.common}</p>
   </div>
   <p>Capital: <span>
   ${country.capital}
  </p>
  <p>Population: <span>${country.population}</span></p>
  <p>Languages: <span>${Object.values(country.languages).join(', ')}</span></p>
   `;
    })
    .join('');

  divEl.innerHTML = markup;
}

//  result.map((country)=>{

//       return `
//         <li class="country-list__item">
//         <img class="country-list__flag" src="${country.flags.svg}" alt="${country.flags.alt}">
//           <p class="country-list__name">${country.name.common}</p>
//       </li>
//       `;
//    }).join("")
//   }
// ).then((res)=>{
//   listEl.insertAdjacentHTML("beforeend",res)
// })
// }

// function createMarkup(evt) {
//   const el = evt.map(({name})=>{
//  return `
//  <li class="country-list__item">
//          <p class="country-list__name">${name}</p>
//      </li>
//      `;
//   }).join("")

//   return el;
// }
