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

function displayWeather(data) {

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const weatherHTML = `
        <div class="weather-header">

            <div>
                <h3>${data.name}</h3>
                <p class="weather-description">${description}</p>
            </div>

            <img 
                class="weather-icon"
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
            >

        </div>

        <div class="temperature">
            ${Math.round(temp)}°
            <span>C</span>
        </div>

        <div class="weather-details">

            <div class="weather-detail">
                <div class="detail-icon">💧</div>
                <span>Humidity</span>
                <strong>${humidity}%</strong>
            </div>

            <div class="weather-detail">
                <div class="detail-icon">💨</div>
                <span>Wind</span>
                <strong>${windSpeed} m/s</strong>
            </div>

        </div>
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

// Function to fetch weather data for multiple cities

async function getMultiWeather(cities) {

    const result = document.getElementById('multiWeatherResult');
    const button = document.getElementById('getMultiWeather');

    // Loading
    result.innerHTML = `<p>Loading weather data...</p>`;
    button.disabled = true;
    button.innerText = 'Loading...';

    try {

        // สร้าง fetch promise สำหรับแต่ละเมือง
        const weatherPromises = cities.map(async function(city) {

            const url = `${baseURL}?q=${encodeURIComponent(city)}&appid=${API}&units=metric`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Cannot get weather for ${city}`);
            }

            return await response.json();
        });

        // รอทุก Promise พร้อมกัน
        const weatherData = await Promise.all(weatherPromises);

        displayMultiWeather(weatherData);

    } catch (error) {

        console.error('Error fetching multiple weather data:', error);

        result.innerHTML = `
            <p class="text-danger">
                ${error.message}
            </p>
        `;

    } finally {

        button.disabled = false;
        button.innerText = 'Search';
    }
}

function displayMultiWeather(weatherData) {

    const result = document.getElementById('multiWeatherResult');

    const weatherHTML = weatherData.map(function(data) {

        return `
            <div class="weather-item">
                <h3>${data.name}</h3>

                <p>
                    <strong>Temperature:</strong>
                    ${data.main.temp} °C
                </p>

                <p>
                    <strong>Humidity:</strong>
                    ${data.main.humidity}%
                </p>

                <p>
                    <strong>Wind Speed:</strong>
                    ${data.wind.speed} m/s
                </p>

                <p>
                    <strong>Description:</strong>
                    ${data.weather[0].description}
                </p>

                <hr>
            </div>
        `;

    }).join('');

    result.innerHTML = weatherHTML;
}

let selectedCities = [];

function addCity() {

    const cityInput = document.getElementById('cities');
    const city = cityInput.value.trim();

    if (!city) {
        return;
    }

    if (!selectedCities.includes(city)) {
        selectedCities.push(city);
    }

    displayCityList();

    cityInput.value = '';
}

function displayCityList() {

    const cityList = document.getElementById('cityList');

    const html = selectedCities.map(function(city) {

        return `
            <span class="badge badge-info mr-2">
                ${city}
            </span>
        `;

    }).join('');

    cityList.innerHTML = html;
}

document.getElementById('addCity').addEventListener('click', function() {
    addCity();
});

document.getElementById('getMultiWeather').addEventListener('click', function() {

    if (selectedCities.length === 0) {

        document.getElementById('multiWeatherResult').innerHTML = `
            <p class="text-danger">
                Please add at least one city.
            </p>
        `;

        return;
    }

    getMultiWeather(selectedCities);
});

function displayMultiWeather(weatherData) {

    const result = document.getElementById('multiWeatherResult');

    const weatherHTML = weatherData.map(function(data) {

        const icon = data.weather[0].icon;

        return `
            <div class="weather-item">

                <div class="mini-weather-header">

                    <div>
                        <h3>${data.name}</h3>

                        <p class="weather-description">
                            ${data.weather[0].description}
                        </p>
                    </div>

                    <img
                        src="https://openweathermap.org/img/wn/${icon}@2x.png"
                        class="mini-weather-icon"
                    >

                </div>

                <div class="mini-temperature">
                    ${Math.round(data.main.temp)}°
                </div>

                <div class="mini-details">

                    <span>
                        💧 ${data.main.humidity}%
                    </span>

                    <span>
                        💨 ${data.wind.speed} m/s
                    </span>

                </div>

            </div>
        `;

    }).join('');

    result.innerHTML = weatherHTML;
}