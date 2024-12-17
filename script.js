let getWeather = async (city) => {
    let weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=4aa6fbae7e5ee26c923fa7279b5cd28b&units=metric';
    let weatherObj = await fetch(weatherAPI);
    let response = await weatherObj.json(); 
    return response;
}

async function callWeather() {
    const cityInput = document.getElementById("city").value; 
    const weatherDiv = document.getElementById("weather"); 

    if (!cityInput) {
        weatherDiv.innerHTML = "Please enter a city name.";
        return;
    }

    try {
        let response = await getWeather(cityInput);
        
        if (response.cod === 200) {
            weatherDiv.innerHTML = `
                <h2>Weather in ${response.name}, ${response.sys.country}</h2>
                <p><strong>Temperature:</strong> ${response.main.temp} Celcius</p>
                <p><strong>Description:</strong> ${response.weather[0].description}</p>
                <p><strong>Latitude:</strong> ${response.coord.lat}</p>
                <p><strong>Longitude:</strong> ${response.coord.lon}</p>
            `;
        } else {
            weatherDiv.innerHTML = `Error: ${response.message}`;
        }
    } catch (err) {
        weatherDiv.innerHTML = "Error fetching weather data. Please try again.";
        console.error(err);
    }
}
