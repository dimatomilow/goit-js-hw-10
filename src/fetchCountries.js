export function fetchCountries(name) {
   return fetch("https://restcountries.com/v2/name/").then(r => r.json().then(console.log))
}