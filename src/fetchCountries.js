export default function fetchCountry(countryId) {
  return fetch(`https://restcountries.com/v2/name/${countryId}?fields=name,capital,population,flags,languages`)
    .then(r => { return r.json(); })
}