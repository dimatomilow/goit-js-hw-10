import './css/styles.css';
// import nameCountry from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', countrySearch);
function countrySearch(e){
    const form = e.currentTarget.value;

    fetchCountry(form).then(country => {
    console.log(country);
})
    .catch(error => {
        console.log(error);
    });
}



console.log(refs.input)



function fetchCountry(countryId) {
  return fetch(`https://restcountries.com/v2/${countryId}`)
    .then(r => { return r.json(); })
}

