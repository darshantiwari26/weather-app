const toggleSwitch = document.getElementById("toggle-switch");
toggleSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

async function getWeather() {
  const apiKey = "ac8b187119a20b3d42a375114d1b302f";
  const city = document.getElementById("city").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      document.getElementById("weather-box").classList.remove("hidden");
      document.getElementById("location").innerText = `${data.name}, ${data.sys.country}`;
      document.getElementById("description").innerText = data.weather[0].description;
      document.getElementById("temperature").innerText = `${data.main.temp}°C`;
      document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").innerText = `Wind Speed: ${data.wind.speed} m/s`;

      const utcSeconds = data.dt + data.timezone;
      const localTime = new Date(utcSeconds * 1000);
      const hour = localTime.getUTCHours();
      const isDayTime = hour >= 6 && hour < 18;

      const status = document.getElementById("day-night-status");
      status.innerHTML = isDayTime ? "☀️ Day at location" : "🌙 Night at location";
    } else {
      alert("City not found!");
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Failed to fetch weather data.");
  }
}
