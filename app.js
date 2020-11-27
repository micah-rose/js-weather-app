window.addEventListener('load', () => {
    let long;
    let lat;

    const temperatureDescr = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const degreeSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

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
                const {temp} = data.main;
                const {main, icon} = data.weather[0];

                let newTemp = (((temp-273.15) * 1.8) + 32)
                let farenheit = newTemp.toFixed(1);

                temperatureDegree.textContent = farenheit;
                temperatureDescr.textContent = main;
                locationTimezone.textContent = data.name;

                let celsius = (farenheit - 32) / 1.8

                setIcons(icon, document.querySelector('.icon'));

                degreeSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = celsius.toFixed(1);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = farenheit;
                    }
                })
            })
        })

    } else {
        h1.textContent = "Please enable us to know your location."
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        let currentIcon;

        if (icon === "01d"){
            currentIcon = 'CLEAR_DAY'
        } else if (icon === "01n"){
            currentIcon = 'CLEAR_NIGHT'
        } else if (icon === "02d"){
            currentIcon = 'PARTLY_CLOUDY_DAY'
        } else if (icon === "02n"){
            currentIcon = 'PARTLY_CLOUDY_NIGHT'
        } else if (icon === "03d" || "03n" || "04d" || "04n"){
            currentIcon = 'CLOUDY'
        } else if (icon === "09d" || "09n" || "10d" || "10n" || "11d" || "11n"){
            currentIcon = 'RAIN'
        } else if (icon === "13d" || "13n"){
            currentIcon = 'SNOW'
        } else if (icon === "50d" || "50n"){
            currentIcon = 'FOG'
        }

        skycons.play();

        return skycons.set(iconID, Skycons[currentIcon]);
    }
})
