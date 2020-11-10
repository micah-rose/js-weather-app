window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescr = document.querySelector('.temperaure-description');
    let temperatureDegree = document.querySelector('.temperaure-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            console.log(position);

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1a302185f4bd5af754e2e38318c2233d`

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp, name} = data.main;
                const {main} = data.weather[0];
            })
        })

    } else {
        h1.textContent = "Please enable us to know your location."
    }
})
