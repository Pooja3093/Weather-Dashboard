var today = moment().format("MMM D, yyyy");

// var date0 = document.querySelector('.card0-date');
// date0.textContent = today;

var searchHistory = document.querySelector('ul');
var searchButton = document.getElementById('searchBtn');


var appId = '1a4023a8d66f702ededffe15151334ac';
var geoCoding = 'https://api.openweathermap.org/geo/1.0/direct';
var Call = "https://api.openweathermap.org/data/2.5/onecall";
var latitude;
var longitude;
var lang = "en";
var weatherInfo = [0, 0, 0, 0, 0, 0];

var card0 = ['.card0-temp', '.card0-wind', '.card0-humidity', 'card0-img', '.card0-date', '.card0-uv'];
var card1 = ['.card1-temp', '.card1-wind', '.card1-humidity', 'card1-img', '.card1-date', '.card1-uv'];
var card2 = ['.card2-temp', '.card2-wind', '.card2-humidity', 'card2-img', '.card2-date', '.card2-uv'];
var card3 = ['.card3-temp', '.card3-wind', '.card3-humidity', 'card3-img', '.card3-date', '.card3-uv'];
var card4 = ['.card4-temp', '.card4-wind', '.card4-humidity', 'card4-img', '.card4-date', '.card4-uv'];
var card5 = ['.card5-temp', '.card5-wind', '.card5-humidity', 'card5-img', '.card5-date', '.card5-uv'];
var cardIndex;


// Function to be executed at refresh or load or reload
function init(){
  var city0 = document.querySelector('.card0-cityname');
  city0.textContent = 'TORONTO';
  oneCall('toronto');
  for (var i = 0; i < localStorage.length; i++) {
    createHistory(localStorage.key(i));
  }
}



// Function for geocoding and oneCall

function oneCall(cityName){

  fetch(geoCoding + "?q=" + cityName + "&limit=1&appid=" + appId)
    .then(function (response) {
      return response.json();
    })
      .then(function (data) {
        latitude = data[0].lat;
        longitude = data[0].lon;        
    })
    .then (function (){
      fetch(Call + "?lat=" + latitude + "&lon=" + longitude + "&units=metric&lang=" + lang + "&exclude=alerts,hourly,minutely&appid=" + appId)
        .then(function (response) {
          return response.json();
        })
          .then(function (data) {
            weatherInfo[0] = data.current['temp'];
            weatherInfo[1] = data.current['wind_speed'];
            weatherInfo[2] = data.current['humidity'];
            weatherInfo[3] = data.current.weather[0].icon;
            weatherInfo[4] = today;
            weatherInfo[5] = data.current['uvi'];
            cardIndex = 0;
            displayWeather(weatherInfo, cardIndex);
            for(var i = 0; i<=4 ; i++){
              cardIndex = i + 1;
              weatherInfo[0] = data.daily[i].temp['day'];
              weatherInfo[1] = data.daily[i].wind_speed;
              weatherInfo[2] = data.daily[i].humidity;
              weatherInfo[3] = data.daily[i].weather[0].icon;
              weatherInfo[4] = moment().add(cardIndex,'days').format("MMM D, yyyy");
              weatherInfo[5] = data.daily[i].uvi;
              displayWeather(weatherInfo, cardIndex);
            }
        });
    })
}



// Function to create recent search list

function createHistory(cityName){
  //Create a list element
  var listItem = document.createElement('li');
  listItem.classList.add('btn-primary');
  var link = document.createElement('a');

  //Set the text of the list element to the JSON response's .html_url property
  link.textContent = cityName.toUpperCase();

  //Append the li element to the id associated with the ul element.
  listItem.appendChild(link);
  searchHistory.appendChild(listItem);
}



//getApi function is called when the fetchButton is clicked

function getApi() {
  var cityName = $('input[name="cityName"]').val();

  // Display City name on dashboard
  var city0 = document.querySelector('.card0-cityname');
  city0.textContent = cityName.toUpperCase();

  // Call functions to create search history and fetch weather data
  createHistory(cityName);
  oneCall(cityName);
  colorCode();
  localStorage.setItem(cityName,'0');
}



// Color code UV Index
function colorCode(){
  var uvselector = [0, 0, 0, 0, 0, 0];

  uvselector[0] = document.querySelector(card0[5]);
  uvselector[1] = document.querySelector(card1[5]);
  uvselector[2] = document.querySelector(card2[5]);
  uvselector[3] = document.querySelector(card3[5]);
  uvselector[4] = document.querySelector(card4[5]);
  uvselector[5] = document.querySelector(card5[5]);

  var uvtrim = [0, 0, 0, 0, 0, 0];
  uvtrim[0] = uvselector[0].textContent.split(':')[1];
  uvtrim[1] = uvselector[1].textContent.split(':')[1];
  uvtrim[2] = uvselector[2].textContent.split(':')[1];
  uvtrim[3] = uvselector[3].textContent.split(':')[1];
  uvtrim[4] = uvselector[4].textContent.split(':')[1];
  uvtrim[5] = uvselector[5].textContent.split(':')[1];

  for(var i = 0; i<=5 ; i++){
    if(uvtrim[i] <=2){
      uvselector[i].classList.add("green");
    } else if (uvtrim[i] >3 && uvtrim[i] <=5){
      uvselector[i].classList.add("yellow");
    } else if (uvtrim[i] >5 && uvtrim[i] <=7){
      uvselector[i].classList.add("orange");
    } else if (uvtrim[i] >7 && uvtrim[i] <=10){
      uvselector[i].classList.add("red");
    } else if (uvtrim[i] >10){
      uvselector[i].classList.add("violet");
    } 
  }

}

// Function to display weather data in all cards

function displayWeather(weatherInfo, cardIndex){
  if (cardIndex == 0){
    document.querySelector(card0[0]).textContent = "Temp : " + weatherInfo[0] + "°C";
    document.querySelector(card0[1]).textContent = "Wind Speed : " + weatherInfo[1] + "km/h";
    document.querySelector(card0[2]).textContent = "Humidity : " + weatherInfo[2] + "%";
    document.getElementById(card0[3]).src = "http://openweathermap.org/img/wn/" + weatherInfo[3] + "@2x.png";
    document.querySelector(card0[4]).textContent = weatherInfo[4];
    document.querySelector(card0[5]).textContent = "UV Index:" + weatherInfo[5];
  } else if (cardIndex == 1){
    document.querySelector(card1[0]).textContent = "Temp : " + weatherInfo[0] + "°C";
    document.querySelector(card1[1]).textContent = "Wind Speed : " + weatherInfo[1] + "km/h";
    document.querySelector(card1[2]).textContent = "Humidity : " + weatherInfo[2] + "%";
    document.getElementById(card1[3]).src = "http://openweathermap.org/img/wn/" + weatherInfo[3] + "@2x.png";
    document.querySelector(card1[4]).textContent = weatherInfo[4];
    document.querySelector(card1[5]).textContent = "UV Index:" + weatherInfo[5];
  } else if (cardIndex == 2){
    document.querySelector(card2[0]).textContent = "Temp : " + weatherInfo[0] + "°C";
    document.querySelector(card2[1]).textContent = "Wind Speed : " + weatherInfo[1] + "km/h";
    document.querySelector(card2[2]).textContent = "Humidity : " + weatherInfo[2] + "%";
    document.getElementById(card2[3]).src = "http://openweathermap.org/img/wn/" + weatherInfo[3] + "@2x.png";
    document.querySelector(card2[4]).textContent = weatherInfo[4];
    document.querySelector(card2[5]).textContent = "UV Index:" + weatherInfo[5];
  } else if (cardIndex == 3){
    document.querySelector(card3[0]).textContent = "Temp : " + weatherInfo[0] + "°C";
    document.querySelector(card3[1]).textContent = "Wind Speed : " + weatherInfo[1] + "km/h";
    document.querySelector(card3[2]).textContent = "Humidity : " + weatherInfo[2] + "%";
    document.getElementById(card3[3]).src = "http://openweathermap.org/img/wn/" + weatherInfo[3] + "@2x.png";
    document.querySelector(card3[4]).textContent = weatherInfo[4];
    document.querySelector(card3[5]).textContent = "UV Index:" + weatherInfo[5];
  }
  else if (cardIndex == 4){
    document.querySelector(card4[0]).textContent = "Temp : " + weatherInfo[0] + "°C";
    document.querySelector(card4[1]).textContent = "Wind Speed : " + weatherInfo[1] + "km/h";
    document.querySelector(card4[2]).textContent = "Humidity : " + weatherInfo[2] + "%";
    document.getElementById(card4[3]).src = "http://openweathermap.org/img/wn/" + weatherInfo[3] + "@2x.png";
    document.querySelector(card4[4]).textContent = weatherInfo[4];
    document.querySelector(card4[5]).textContent = "UV Index:" + weatherInfo[5];
  }
  else if (cardIndex == 5){
  document.querySelector(card5[0]).textContent = "Temp : " + weatherInfo[0] + "°C";
  document.querySelector(card5[1]).textContent = "Wind Speed : " + weatherInfo[1] + "km/h";
  document.querySelector(card5[2]).textContent = "Humidity : " + weatherInfo[2] + "%";
  document.getElementById(card5[3]).src = "http://openweathermap.org/img/wn/" + weatherInfo[3] + "@2x.png";
  document.querySelector(card5[4]).textContent = weatherInfo[4];
  document.querySelector(card5[5]).textContent = "UV Index:" + weatherInfo[5];
  }
  
}



// Handle function for event listener on search history

function history(event){
  var name = event.target.textContent;
  var city0 = document.querySelector('.card0-cityname');
  city0.textContent = name.toUpperCase();
  oneCall(name);
}


init();

// Event listener for search
searchButton.addEventListener('click', getApi);


// Event listener for search history
searchHistory.addEventListener('click', history);
