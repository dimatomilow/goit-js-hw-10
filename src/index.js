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

function countrySearch(e){
    const form = e.target.value;

    nameCountry(form).then(promiseHandling)
    .catch(promiseError);
}

countrySearch = debounce(countrySearch,DEBOUNCE_DELAY)

refs.input.addEventListener('input', countrySearch);



function promiseHandling(country) {
    console.log(country);
    const listCountry = nameCountryList(country)
    const markup = countryCard(country)

        if (country.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          return;
        } else if (country.length >= 3 && country.length <= 10) {
            refs.countryList.innerHTML = listCountry;
            refs.countryInfo.innerHTML = '';
          return;
        } else {
            refs.countryInfo.innerHTML = markup;
            refs.countryList.innerHTML = '';
}

     console.log(markup);

}


function promiseError(country) {
    if (!country.length === country) {
        Notiflix.Notify.failure('Qui timide rogat docet negare');
        return;
    }

}