

//"use strict";
var app = {};


function asignaMunicipio(){
  app.municipio = $('#municipio').val();
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
    app.municipio = $('#municipio').val();
  }

  app.url = "http://api.openweathermap.org/data/2.5/weather?q=" + app.municipio + "&APPID=" + app.apikey + "&units=metric";
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
  app.condicionNombre = app.datos.weather[0].main;
  app.temperatura = app.datos.main.temp;

  //var condicionIcono = app.datos.weather[0].icon;
  app.icono = "http://openweathermap.org/img/w/"+app.datos.weather[0].icon+".png";
  //app.obtenIcono(condicionIcono);

  app.muestra();
}

app.muestra = function() {
  $('#js_w_munic').html(app.municipio);
  $('#js_w_icon').attr("src",app.icono);
  $('#js_w_temp').html(app.temperatura + " ºC</p>");
  //$('#js_w_icon').append("<p class='weather_name'>" + app.condicionNombre.toUpperCase() + "</p>");
}
