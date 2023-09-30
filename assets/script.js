
var fiveDaySection =document.querySelector("#five-day-forecast")
var searchInput = document.querySelector("#search-input")
var searchButton = document.querySelector("#search-btn")
var weatherContainer = document.querySelector("#main-weather-container")
var historyContainer=document.querySelector(".history-search")
var apiKey = 'bc6ba4743737d1c5fae7d620e9590175'
var cityArray=[]

var getHistory =(searchHistory)=>{
    var btn= document.createElement("button")
    btn.setAttribute("class", "btn btn-warning history-btn")
    btn.textContent=searchHistory
    historyContainer.append(btn)
}

var searchHistory= JSON.parse(localStorage.getItem("history")) || []
for (let i = 0; i < searchHistory.length; i++) {
   getHistory(searchHistory[i])
    
}

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
        <div class=card>
        <div class=card-header>
        <h3>${cityData.name} <span><img src="${weatherImage}"></span></h3>
        </div>
        <div class=card-body>
        <p> Weather Description: ${cityData.weather[0].description}</p>
        <p>temperature: ${cityData.main.temp}</p>
        <p>humidity: ${cityData.main.humidity}</p>
        <p>humidity: ${cityData.wind.speed}</p>
        </div>
        </div>
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
                var forI= i *8+4
                var day= new Date(fiveDayArray[forI].dt*1000).toDateString()
                var weatherImage= `https://openweathermap.org/img/w/${fiveDayArray[forI].weather[0].icon}.png`
                fiveDayWeather +=`
                <div class='card forecast-card'>
        <div class=card-header>
        <h6>${day} <span><img src="${weatherImage}"></span></h6>
        </div>
        <div class=card-body>
        <p> Weather Description: ${fiveDayArray[forI].weather[0].description}</p>
        <p>temperature: ${fiveDayArray[forI].main.temp}</p>
        <p>humidity: ${fiveDayArray[forI].main.humidity}</p>
        <p>humidity: ${fiveDayArray[forI].wind.speed}</p>
        </div>
        </div>
                `;
                fiveDaySection.innerHTML=fiveDayWeather
            }


        })
    })

}


function storage(city){
    searchHistory=JSON.parse(localStorage.getItem("history")) ||[]
    if(!cityArray.includes(city)){
        cityArray.push(city)
        localStorage.setItem("history", JSON.stringify(cityArray))
        getHistory(city)
    }
}

searchButton.addEventListener("click",function(e){
    e.preventDefault()
    var cityName = searchInput.value.trim()
    search(cityName)
    searchInput.value=""
    storage(cityName)
})

historyContainer.addEventListener("click", (e)=>{
    e.preventDefault()
    weatherContainer.innerHTML=""
    
    var citySearch=this.event.target.textContent
    search(citySearch)
    console.log(citySearch);
})

