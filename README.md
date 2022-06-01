# jubilant-adventure

## Module 6 Challenge


This project was designed as an assignment for Module 6 : Server Side API

This application was designed using HTML, CSS, Javascript and server side API's. It emphasizes the use of server side API's to get information (data).


## Links:

[GitHub Repository]()

[Deployed Application]()

[Full Demo Video]()


## Summary

In this challenge, a weather dashboard was designed using server side API "OpenWeatherMap.org".

The HTML page was designed and styled with the help of Bootstrap. Then using Javascript fetch calls were made to gather weather information.

From the data received, temperature, humidity, wind speed and UV index were choosen to be displayed on the dashboard. The UV Index is color coded in standard way, so that user can understand the exposure level by color.

When a user enters a city name in the search box and clicks the search button, fetch call is made to get the co-ordinates (latitude and longitude) of that city. Then a second fetch call is made to receive weather information for that co-ordinates.

On the dashboard, current weather and 5-day forecast are displayed.

Also a search history is created, and event listners are added to the list. Hence if a user chooses, then he can directly click on any recent search item and get weather data for that city.

This search history is also stored in local storage and will also be displayed when the page refreshes.


## Features:

* Search button
* Click events in recent search history
* Real-time date
* Color coded UV Index
* Local storage of search history
* Fetch calls for geocoding and weather

## Screenshot:

![screenshot]()
