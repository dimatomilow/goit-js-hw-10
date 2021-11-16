import './css/styles.css';
import nameCountry from './fetchCountries';
import nameCountryList from './name-country.hbs';
import countryCard from './country-card.hbs'
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}


const debounce = (fn, ms) => {
    let timeout;
    return function () { const fnCall = () => { fn.apply(this, arguments) }
        clearTimeout(timeout);
       timeout = setTimeout(fnCall, ms)
    }
}

function countrySearch(e) {
    const inputCountry = e.target.value;
    if (inputCountry.trim() === ' ') {
    deleteMarkup();
    return;
  }
    deleteMarkup();

    nameCountry(inputCountry.trim()).then(promiseHandling)
    .catch(promiseError);
}

countrySearch = debounce(countrySearch,DEBOUNCE_DELAY)

refs.input.addEventListener('input', countrySearch);



function promiseHandling(country) {
        if (country.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          return;
        } else if (country.length >= 2 && country.length <= 10) {
            showCountryList(country)
          return;
        } else if (country.length === 1) {
            showCountry(country)
            return;
}
}


function promiseError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}



function deleteMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function showCountryList(country) {
    const listCountry = nameCountryList(country)
    refs.countryList.innerHTML = listCountry;
}

function showCountry(country) {
    const markup = countryCard(country)
    refs.countryInfo.innerHTML = markup;
}