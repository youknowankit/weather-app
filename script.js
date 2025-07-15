const apiKey = "API_KEY"; // Replace with your OpenWeather API key

// Main function to get weather by city name
async function getWeatherByCity(city) {
  const weatherResult = document.getElementById("weatherResult");

  weatherResult.innerHTML =
    '<p style="color:#2563eb;">Fetching weather data...</p>';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      weatherResult.innerHTML =
        '<p style="color:red;">City not found. Try again.</p>';
    } else {
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      weatherResult.innerHTML = `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p><strong>${temp}°C</strong></p>
        <p style="text-transform: capitalize;">${description}</p>
      `;
    }
  } catch (error) {
    console.error("Error:", error);
    weatherResult.innerHTML =
      '<p style="color:red;">Something went wrong. Try again later.</p>';
  }
}

// Called when user clicks "Get Weather" button
function getWeather() {
  const cityInput = document.getElementById("cityInput").value.trim();
  if (cityInput) {
    getWeatherByCity(cityInput);
  } else {
    document.getElementById("weatherResult").innerHTML =
      '<p style="color:red;">Please enter a city name.</p>';
  }
}
