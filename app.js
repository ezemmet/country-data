const input = document.getElementById('input')
const btn = document.getElementById('btn')
const para = document.getElementById('para')

async function getData() {
    const url = `https://restcountries.com/v3.1/name/${input.value}`;
    const options = {
        method: 'GET',
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        // Extract relevant fields
        const filteredData = result.map((country) => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : 'No Capital',
            continents: country.continents,
            currencies: country.currencies,
            languages: country.languages,
            population: country.population
        }));

        //Log every data
        for (const country of filteredData) {
            console.log('Country:', country.name);
            console.log('Capital:', country.capital);
            console.log('Continents:', country.continents.join(', '));
            const currencyNames = Object.values(country.currencies || {}).map((currency) => currency.name);
            console.log('Currencies:', currencyNames.join(', '));
            const languageNames = Object.values(country.languages || {});
            console.log('Languages:', languageNames.join(', '));
            console.log('Population:', country.population);
        }

        // para.innerHTML = filteredData.capital
        console.log(filteredData);
        console.log(result);

    } catch (error) {
        console.error(error);
    }
}

btn.addEventListener('click', () => {
    getData();
    console.log('INPUT VALUE :: =', input.value);
})