let locationButton = document.querySelector("button");

window.addEventListener("load", () => {
  locationButton.addEventListener("click", () => {
    let long;
    let lat;
    let name;
    let region;
    let temperatureDescription = document.querySelector(
      ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");
    let icon = document.querySelector(".icon");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        console.log(lat);
        console.log(long);
        //const api = `http://api.weatherstack.com/current?access_key=10ab4a7df105deb90a7807dd883068da&query=${lat},${long}`;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0b7348b503660d40ef61b344729836c8`;
        console.log(api);
        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            const {
              temperature,
              weather_descriptions,
              weather_icons,
            } = data.current;
            //Set DOM elements from the API
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = data.weather.description;
            name = data.main.name;
            region = data.location.region;
            locationTimezone.textContent = name + "/" + region;
            // Formula for  Fahrenheit
            let fahrenheit = temperature * (9 / 5) + 32;
            //set Icon
            icon.src = weather_icons;

            // change temparature to Fahrenheit
            temperatureSection.addEventListener("click", () => {
              if (temperatureSpan.textContent === "C") {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = Math.floor(fahrenheit);
              } else {
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = temperature;
              }
            });
          });
      });
    }
  });
});
