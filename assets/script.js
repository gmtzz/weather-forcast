
var fiveDaySection =document.querySelector("#five-day-forecast")
var searchInput = document.querySelector("#search-input")
var searchButton = document.querySelector("#search-btn")
var weatherContainer = document.querySelector("#main-weather-container")
var apiKey = 'bc6ba4743737d1c5fae7d620e9590175'

function search(cityName){
    console.log("click")
    fetch (
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
    ).then (function(response){
        return response.json()
    }).then (function(cityData){
        
        var weatherCode =cityData.weather[0].icon
        var weatherImage = `https://openweathermap.org/img/w/${weatherCode}.png`
        var currentWeather =`
        <div>${cityData.name}</div>
        <img src="${weatherImage}">
        <p>${cityData.weather[0].description}</p>
        <p>temperature: ${cityData.main.temp}</p>
        <p>humidity: ${cityData.main.humidity}</p>
        <p>humidity: ${cityData.wind.speed}</p>
        `;
        weatherContainer.innerHTML=currentWeather;
        var lat = cityData.coord.lat
        var lon =cityData.coord.lon

        fetch (
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
            

        ).then(function(response){
            return response.json()
        }).then(function(fiveDayData){
            console.log(fiveDayData)
            var fiveDayArray = fiveDayData.list
            var fiveDayWeather =""
            for (var i=0;i<=4;i++){
                console.log (fiveDayArray[i])
                fiveDayWeather +=`
                <div>
                <h2>${fiveDayArray[i].main.temp}</h2>
                </div>
                `;
                fiveDaySection.innerHTML=fiveDayWeather
            }


        })
    })

}
searchButton.addEventListener("click",function(e){
    e.preventDefault()
    var cityName = searchInput.value.trim()
    search(cityName)
    searchInput.value=""
})
