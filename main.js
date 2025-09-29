// ---- Weather App JS ----

// OpenWeather API key (get your own free key from openweathermap.org)
const apiKey = "085e7122cdd19ea114934fe7adad6458";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".Weather img");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      document.querySelector(".City").innerHTML = "City not found!";
      document.querySelector(".temp").innerHTML = "--°C";
      document.querySelector(".humidity").innerHTML = "--%";
      document.querySelector(".wind").innerHTML = "-- km/h";
      weatherIcon.src = "weather.png";
      return;
    }

    const data = await response.json();

    // Update UI
    document.querySelector(".City").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Change weather icon dynamically
    const weatherMain = data.weather[0].main;
    if (weatherMain === "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (weatherMain === "Clear") {
      weatherIcon.src = "clear.png";
    } else if (weatherMain === "Rain") {
      weatherIcon.src = "rain.png";
    } else if (weatherMain === "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (weatherMain === "Mist") {
      weatherIcon.src = "mist.png";
    } else if (weatherMain === "Snow") {
      weatherIcon.src = "snow.png";
    } else {
      weatherIcon.src = "weather.png"; // fallback
    }

  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// When user clicks search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// When user presses "Enter"
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
