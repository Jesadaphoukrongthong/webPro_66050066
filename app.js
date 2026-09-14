const API="e74a51976785a691acf8feca909a6971";
const baseURL="https://api.openweathermap.org/data/2.5/weather";

async function getWeather(city){
    const url =`${baseURL}?q=${encodeURIComponent(city)}&appid=${API}&units=metric`;
    console.log(url);

    document.getElementById('weatherResult').innerHTML = `<p class="text-info">Fetching weather data for ${city}...</p>`;

    try{
        
        const response=await fetch(url);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data=await response.json();
        displayWeather(data);
    }  
    catch(error){
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherResult').innerHTML = `<p class="text-danger">Error fetching weather data: ${error.message}</p>`;
    }
}

function displayWeather(data){
    console.log(data);
    const tmp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;

    const weatherHTML = `
        <h3>Weather in ${data.name}</h3>
        <p><strong>Temperature:</strong> ${tmp} °C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        <p><strong>Description:</strong> ${description}</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherHTML;
}

document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    if(city){
        getWeather(city);
    } else {
        document.getElementById('weatherResult').innerHTML = `<p class="text-danger">Please enter a city name.</p>`;
    }
});
