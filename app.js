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

        const api = `http://api.weatherstack.com/current?access_key=10ab4a7df105deb90a7807dd883068da&query=${lat},${long}`;
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
            temperatureDescription.textContent = weather_descriptions;
            name = data.location.name;
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
