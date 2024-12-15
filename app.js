const input = document.getElementById('input')
const btn = document.getElementById('btn')

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
                <h1>${name}</h1>
                <p><strong>Capital:</strong> ${capital}</p>
                <p><strong>Currency:</strong> ${currencies}</p>
                <p><strong>Languages:</strong> ${languages}</p>
                <p><strong>Continents:</strong> ${continents}</p>
                <p><strong>Population:</strong> ${population}</p>
                <p><strong>Borders:</strong> ${borders ? borders : 'NO BORDERS FOUND'}</p>
                <hr>
            `;
            resultContainer.appendChild(countryDiv);
        });

    } catch (error) {
        console.error(error);
    }
}

btn.addEventListener('click', () => {
    getData();
})