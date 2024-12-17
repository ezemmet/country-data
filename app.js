const input = document.getElementById('input')
const btn = document.getElementById('btn')
const resultPara = document.getElementById('resultPara')

async function getData() {

    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    const url = `https://restcountries.com/v3.1/name/${input.value}`;
    const options = {
        method: 'GET',
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        result.forEach((country) => {
            const name = country.name.common;
            const capital = country.capital ? country.capital[0] : 'No Capital';
            const continents = country.continents.join(', ');
            const currencies = Object.values(country.currencies || {}).map((currency) => currency.name).join(', ');
            const languages = Object.values(country.languages || {}).join(', ');
            const population = country.population;
            const borders = Object.values(country.borders || {}).join(', ')

            const countryDiv = document.createElement('div');
            countryDiv.classList.add('country');
            countryDiv.innerHTML = `
            <div class="parent">
                <h1 class="heading">${name}</h1>
                <p><span>Capital:</span> ${capital}</p>
                <p><span>Currency:</span> ${currencies}</p>
                <p><span>Languages:</span> ${languages}</p>
                <p><span>Continent:</span> ${continents}</p>
                <p><span>Population:</span> ${population}</p>
                <p><span>Borders:</strong> ${borders ? borders : 'NO BORDERS FOUND'}</p>
            </div>       
            `;
            resultContainer.appendChild(countryDiv);
        });

    } catch (error) {
        console.error(error);
    }
}

btn.addEventListener('click', () => {
    getData();
    resultPara.innerHTML = `Showing results for "${input.value}"`
})