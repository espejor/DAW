

//"use strict";
var app = {};
var iconoHumedad = "./images/iconos/humedad.png";
var iconoWind = "./images/iconos/wind.png";
var iconoTemp = "./images/iconos/temp.png";
var municipio = "Sevilla";

function asignaMunicipio(){
  municipio = $('#municipio').val();
  app.cargaDatos();
}


$(document).ready(function(){
  $("#consultar").click(asignaMunicipio);
  app.apikey = "05b19ab20e25b29516d13983b8491391";
  app.municipio = "Sevilla";
  app.cargaDatos();
});

app.cargaDatos = function() {

  if ($('#municipio').val() != ""){
    municipio = $('#municipio').val();
  }

  app.url = "http://api.openweathermap.org/data/2.5/weather?q=" + municipio + "&APPID=" + app.apikey + "&units=metric";
  $.ajax({
    url: app.url,
    success: function(data) {
      app.datos = data;
      app.procesaDatos();
    },
    error: function() {
      alert("Ups! No puedo obtener información de la API");
    }
  });
}

app.procesaDatos = function() {
  app.municipio = app.datos.name;
  app.condicionNombre = app.datos.weather[0].main;
  app.temperatura = app.datos.main.temp;
  app.temperatura = (parseInt(app.temperatura)).toString();

  app.windSpeed = app.datos.wind.speed;
  app.windSpeed = (parseInt(app.windSpeed)).toString();

  app.windDir = app.datos.wind.deg;
  app.windDir = (parseInt(app.windDir)).toString();

  app.humedad = app.datos.main.humidity;
  //var condicionIcono = app.datos.weather[0].icon;
  app.icono = "http://openweathermap.org/img/w/"+app.datos.weather[0].icon+".png";
  //app.obtenIcono(condicionIcono);

  app.muestra();
}

app.muestra = function() {
  $('#js_w_munic').html(app.municipio);
  $('#js_w_icon').attr("src",app.icono);
  $('#js_w_temp_icon').attr("src",iconoTemp);
  $('#js_w_temp').html(app.temperatura + " ºC");
  $('#js_w_wind_Icon').attr("src",iconoWind);
  $('#js_w_windS').html(app.windSpeed + " m/s");
  $('#js_w_windD').html(app.windDir + " º");
  $('#js_w_humedad').html(app.humedad + " %");
  $('#js_w_humedad_Icon').attr("src",iconoHumedad);
  //$('#js_w_icon').append("<p class='weather_name'>" + app.condicionNombre.toUpperCase() + "</p>");
}
