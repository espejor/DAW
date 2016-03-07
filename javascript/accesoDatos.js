

"use strict";
var app = {};
app.apikey = "05b19ab20e25b29516d13983b8491391";
app.url = "http://api.openweathermap.org/data/2.5/weather?q=Malaga&APPID=" + app.apikey + "&units=metric";

app.cargaDatos = function() {
  $.ajax({
    url: app.url,
    success: function(data) {
      app.datos = data;
      app.procesaDatos();
    },
    error: function() {
      alert("�Ups! No puedo obtener informaci�n de la API");
    }
  });
}

app.procesaDatos = function() {
  app.condicionNombre = app.datos.weather[0].main;
  app.temperatura = app.datos.main.temp;

  var condicionIcono = app.datos.weather[0].icon;
  app.icono = app.obtenIcono(condicionIcono);

  app.muestra();

}

app.muestra = function() {
  $('#js_w_temp').append("<p class='weather_temperature'>" + app.temperatura + "�</p>");
  $('#js_w_icon').append(" <i class='wi " + app.icono + "'></i>");
  $('#js_w_icon').append("<p class='weather_name'>" + app.condicionNombre.toUpperCase() + "</p>");
}

app.obtenIcono = function(weatherIcon) {
  var icon;
  switch (weatherIcon) {
    case "01d":
    case "01n":
      icon = "wi-day-sunny";
      break;
    case "02d":
    case "02n":
      icon = "wi-day-cloudy";
      break;

    case "03d":
    case "03n":
      icon = "wi-cloud";
      break;

    case "04d":
    case "04n":
      icon = "wi-cloudy";
      break;

    case "09d":
    case "09n":
      icon = "wi-rain";
      break;

    case "10d":
    case "10n":
      icon = "wi-day-rain-mix";
      break;

    case "11d":
    case "11n":
      icon = "wi-thunderstorm";
      break;

    case "13d":
    case "13n":
      icon = "wi-snow";
      break;

    case "50d":
    case "50n":
      icon = "wi-fog";
      break;

    default:
      icon = "wi-day-sunny";
      break;

  }

  return icon;
}

app.cargaDatos();

/*

function descargaArchivo() {
  // Obtener la instancia del objeto XMLHttpRequest
  if(window.XMLHttpRequest) {
    peticion_http = new XMLHttpRequest();
  }
  else if(window.ActiveXObject) {
    peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // Preparar la funcion de respuesta
  peticion_http.onreadystatechange = muestraContenido;

  // Realizar peticion HTTP
  peticion_http.open('GET', 'http://localhost/holamundo.txt', true);
  peticion_http.send(null);

  function muestraContenido() {
    if(peticion_http.readyState == 4) {
      if(peticion_http.status == 200) {
        alert(peticion_http.responseText);
      }
    }
  }
}

window.onload = descargaArchivo;
*/
