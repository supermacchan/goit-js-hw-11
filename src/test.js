import Notiflix from 'notiflix';

const countryCard = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

function fetchCountries(name) {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                countryList.innerHTML = '';
                countryCard.innerHTML = '';
                return;
            } else if (data.length >= 2 && data.length <= 10) {
                const newList = generateCountryList(data);
                countryList.innerHTML = newList;
                countryCard.innerHTML = '';
            } else if (data.length === 1) {
                const newMarkup = generateCountryMarkup(data[0]);
                countryCard.innerHTML = newMarkup;
                countryList.innerHTML = '';
            }  
        })
        .catch(error => {
            Notiflix.Notify.failure("Oops, there is no country with that name");
            countryList.innerHTML = '';
            countryCard.innerHTML = '';
        })
}

function generateCountryMarkup(country) {
    return `<h2 class="country-name">
                <img class="country-flag" src="${country.flags.svg}" alt="${country.name.official}" width="40" height="25" />
                ${country.name.official}
            </h2>
            <ul class="country-properties">
                <p class="country-capital"><b>Capital:</b> ${country.capital}</p>
                <p class="country-population"><b>Population:</b> ${country.population}</p>
                <p class="country-langs"><b>Languages:</b> ${Object.values(country.languages).join(', ')}</p>
            </ul>`
}

function generateCountryList(countries) {
    return countries
        .map(country => {
        const flag = country.flags.svg;
        const name = country.name.official;
        return `<div><p class="country-name">
                <img class="country-flag" src="${flag}" alt="${name}" width="40" height="25" />
                ${name}
                </p></div>`
        
        })
        .join('');
}


export { fetchCountries };