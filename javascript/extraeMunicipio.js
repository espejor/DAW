app.municipio = document.getElementById("municipio").value;
app.url = "http://api.openweathermap.org/data/2.5/weather?q=" + app.municipio +"&APPID=" + app.apikey + "&units=metric";
app.cargaDatos();
