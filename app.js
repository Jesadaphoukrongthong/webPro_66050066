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

document.getElementById('getMultiWeather').addEventListener('click', function() {

    const input = document.getElementById('cities').value.trim();

    if (!input) {

        document.getElementById('multiWeatherResult').innerHTML = `
            <p class="text-danger">
                Please enter city names.
            </p>
        `;

        return;
    }

    const cities = input
        .split(',')
        .map(city => city.trim())
        .filter(city => city !== '');

    getMultiWeather(cities);
});