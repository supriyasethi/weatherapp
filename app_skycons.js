window.addEventListener("load", () => {
  let long;
  let lat;
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
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = weather_descriptions;
          locationTimezone.textContent = data.location.timezone_id;
          // Formula for  celcius
          let fahrenheit = temperature * (9 / 5) + 32;
          //set Icon
          icon.src = weather_icons;
          //setIcons(
          //  weather_descriptions,
          //  document.querySelector(".icon"),
          //
          //);

          // change temparature to celcius
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

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    console.log(icon);
    //const currentIcon = String(icon).replace(/ /g, "_").toUpperCase();
    const currentIcon = "PARTLY_CLOUDY_DAY";

    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
