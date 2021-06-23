btn = document.querySelector("#search-button");


todaysForecast = function(){
    var city = document.getElementById("city").value.toLowerCase().trim();

    $(".city-data").remove();
    $(".future-forecast").remove();
    
    
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c9e35d72613b8421a57cb99446bd1d2f")
    .then(function(response){
        return response.json();
    }).then(function(data){

        if (data.cod != "404" & city != "" ) {
            

            var cityData = $("<div>");
            cityData.addClass("card city-data");
    
            var cityName = $("<h1>")
            .text(city.toUpperCase().trim());
    
            var cityTemp = $("<p>")
            .text("Temp: " + Math.round(data.main.temp) + "°f");
    
            var cityWind = $("<p>")
            .text("Wind Speed: " + data.wind.speed + "mph");
    
            var cityHumidity = $("<p>")
            .text("Humidity: " + data.main.humidity + "%");;
    
            cityData.append(cityName, cityTemp, cityWind, cityHumidity);
            $("#today").append(cityData);
    
            futureForecast(data.coord.lon, data.coord.lat, city);
        }else{
            alert("Please input a valid city.");
        }
    })
}

futureForecast = function(lon, lat,){

    fetch("https://api.openweathermap.org/data/2.5/onecall?lon=" + lon + "&lat=" + lat + 
    "&units=imperial&exclude=hourly,alerts,minutely&appid=c9e35d72613b8421a57cb99446bd1d2f")
    .then(function(response){
        return response.json()
    }).then(function(data){

        
        var cityUV = $("<p>")
        .text("UV Index: " + data.current.uvi);

        $(".city-data").append(cityUV);

        for (let i = 0; i < 4; i++) {
             var dayData = $("<div>")
             .addClass("card future-forecast");

             var date = $("<p>")
             .text(moment().add(i + 1, "day").format("L"));

             var dayTemp = $("<p>")
             .text("Temp: " + Math.round(data.daily[i].temp.day) + "°f");

             var dayWind = $("<p>")
             .text("Wind: " + data.daily[i].wind_speed + "mph");

             var dayHumidity = $("<p>")
             .text("Humidity: " + data.daily[i].humidity + "%")

             dayData.append(date, dayTemp, dayWind, dayHumidity);

             $("#future").append(dayData);


            
        }

    })
}

btn.addEventListener("click", todaysForecast);