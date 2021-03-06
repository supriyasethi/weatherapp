let textInput = document.querySelector(".form-text");
let locationButton = document.querySelector(".form-button");
window.addEventListener(
  "error",
  function (e) {
    console.log(e);
  },
  true
);

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
    if (textInput.value == "") {
      alert("Fill the city name");
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${textInput.value}&appid=0b7348b503660d40ef61b344729836c8`;
        console.log(api);
        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);

            //Set DOM elements from the API
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = (data.main.temp - 273.15).toFixed(
              2
            );
            temperatureDescription.textContent = data.weather[0].description;

            console.log(data.weather[0].description);
            name = data.name;

            locationTimezone.textContent = name;
            // Formula for  Fahrenheit
            let fahrenheit = ((data.main.temp - 273.15) * (9 / 5) + 32).toFixed(
              2
            );
            //set Icon
            var iconurl =
              "http://openweathermap.org/img/w/" +
              data.weather[0].icon +
              ".png";
            icon.src = iconurl;

            // change temparature to Fahrenheit
            temperatureSection.addEventListener("click", () => {
              if (temperatureSpan.textContent === "C") {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = Math.floor(fahrenheit);
              } else {
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = (
                  data.main.temp - 273.15
                ).toFixed(2);
              }
            });
          });
      });
    }
  });
});
