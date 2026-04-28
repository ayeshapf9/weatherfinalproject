const weatherContainer = document.getElementById("weather-container");

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,weather_code,wind_speed_10m_max,wind_direction_10m_dominant&current_weather=true&temperature_unit=fahrenheit&timezone=auto";

function getWindDirection(degrees) {
    if (degrees >= 337.5 || degrees < 22.5) return "N";
    if (degrees >= 22.5 && degrees < 67.5) return "NE";
    if (degrees >= 67.5 && degrees < 112.5) return "E";
    if (degrees >= 112.5 && degrees < 157.5) return "SE";
    if (degrees >= 157.5 && degrees < 202.5) return "S";
    if (degrees >= 202.5 && degrees < 247.5) return "SW";
    if (degrees >= 247.5 && degrees < 292.5) return "W";
    if (degrees >= 292.5 && degrees < 337.5) return "NW";
    return "N";
}



function getWeatherBackground(weatherCode) {
    if (weatherCode >= 0 && weatherCode <= 1) return "url('assets/sunny-bg.jpg')";
    if (weatherCode >= 2 && weatherCode <= 3) return "url('assets/clouds-bg.jpg')";
    if (weatherCode >= 40 && weatherCode <= 49) return "url('assets/fog-bg.jpg')";
    if (weatherCode >= 50 && weatherCode <= 69) return "url('assets/rain-bg.jpg')";
    if (weatherCode >= 70 && weatherCode <= 79) return "url('assets/snow-bg.jpg')";
    return "url('assets/sunny-bg.jpg')";
}

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const locationName = "New York City";
        const locationElement = document.createElement("p");
        locationElement.textContent = locationName;
        locationElement.classList.add("location-text");
        weatherContainer.before(locationElement);
        
        const dates = data.daily.time;
        const maxTemps = data.daily.temperature_2m_max;
        const minTemps = data.daily.temperature_2m_min;
        const uvIndices = data.daily.uv_index_max;
        const precipSums = data.daily.precipitation_sum;
        const weatherCodes = data.daily.weather_code;
        const windSpeeds = data.daily.wind_speed_10m_max;
        const windDirections = data.daily.wind_direction_10m_dominant;

        for (let i = 0; i < 7; i++) {
            const card = document.createElement("div");
            card.classList.add("card");
            
            card.style.backgroundImage = getWeatherBackground(weatherCodes[i]);
            card.style.backgroundSize = "cover";
            card.style.backgroundPosition = "center";
            
            const cardInner = document.createElement("div");
            cardInner.classList.add("card-inner");
            
            const dateObj = new Date(dates[i]);
            const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
            const monthDay = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            const formattedDate = dayName + ", " + monthDay;
            
            const dateElement = document.createElement("h2");
            dateElement.textContent = formattedDate;
            
            const maxTemp = document.createElement("p");
            maxTemp.innerHTML = "<strong>High:</strong> " + Math.round(maxTemps[i]) + "°F";
            
            const minTemp = document.createElement("p");
            minTemp.innerHTML = "<strong>Low:</strong> " + Math.round(minTemps[i]) + "°F";
            
            const uvIndex = document.createElement("p");
            uvIndex.innerHTML = "<strong>UV Index:</strong> " + uvIndices[i];
            
            const windSpeedMph = Math.round(windSpeeds[i]);
            const windDir = getWindDirection(windDirections[i]);
            const windText = document.createElement("p");
            windText.innerHTML = "<strong>Wind:</strong> from " + windDir + " at " + windSpeedMph + " mph";
            
            
            
            cardInner.appendChild(dateElement);
            cardInner.appendChild(maxTemp);
            cardInner.appendChild(minTemp);
            cardInner.appendChild(uvIndex);
            cardInner.appendChild(windText);
            card.appendChild(cardInner);
            weatherContainer.appendChild(card);
        }
    });
