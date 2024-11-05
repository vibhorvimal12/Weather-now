async function getWeather() {
    const city = document.getElementById("city-input").value.trim();
    const apiKey = "your_actual_api_key"; // Replace with your actual API key
  
    
    if (!city) {
      document.getElementById("weather-result").innerHTML = "<p>Please enter a city name.</p>";
      return;
    }
  
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  
    try {
      console.log("Attempting to fetch weather data...");
  
      const response = await fetch(url);
  
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found. Please check the city name.");
        } else if (response.status === 401) {
          throw new Error("Invalid API key. Please check your API key.");
        } else {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      }
  
     
      const data = await response.json();
      console.log("Data received:", data); 
  
   
      const { name, main, weather } = data;
      document.getElementById("weather-result").innerHTML = `
        <h3>${name}</h3>
        <p>Temperature: ${main.temp} °C</p>
        <p>Weather: ${weather[0].description}</p>
      `;
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      document.getElementById("weather-result").innerHTML = `<p>${error.message}</p>`;
    }
  }
  