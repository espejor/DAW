

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
  app.url_frcst = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + municipio + "&APPID=" + app.apikey + "&units=metric&cnt7";
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
  $.ajax({
    url: app.url_frcst,
    success: function(data) {
      app.datos_frcst = data;
      app.procesaDatos_frcst();
    },
    error: function() {
      alert("Ups! No puedo obtener información de la previsión a una semana");
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
  app.portada = "images/" + app.datos.weather[0].icon+".jpg";
  app.muestra();
}
app.procesaDatos_frcst = function() {
  app.fecha_frcst = new Array(7);
  app.temp_max_frcst = new Array(7);
  app.temp_min_frcst = new Array(7);
  app.windSpeed_frcst = new Array(7);
  app.windDir_frcst = new Array(7);
  app.humedad_frcst = new Array(7);
  app.icono_frcst = new Array(7);

  for(var i=0;i<7;i++){
    app.fecha_frcst[i] = new Date (app.datos_frcst.list[i].dt * 1000);
    app.temp_max_frcst[i] = app.datos_frcst.list[i].temp.max;
    app.temp_max_frcst[i] = (parseInt(app.temp_max_frcst[i])).toString();
    app.temp_min_frcst[i] = app.datos_frcst.list[i].temp.min;
    app.temp_min_frcst[i] = (parseInt(app.temp_min_frcst[i])).toString();

    app.windSpeed_frcst[i] = app.datos_frcst.list[i].speed;
    app.windSpeed_frcst[i] = (parseInt(app.windSpeed_frcst[i])).toString();

    app.windDir_frcst[i] = app.datos_frcst.list[i].deg;
    app.windDir_frcst[i] = (parseInt(app.windDir_frcst[i])).toString();

    app.humedad_frcst[i] = app.datos_frcst.list[i].humidity;
    //var condicionIcono = app.datos.weather[0].icon;
    app.icono_frcst[i] = "http://openweathermap.org/img/w/"+app.datos_frcst.list[i].weather[0].icon+".png";
  //app.obtenIcono(condicionIcono);
  }
  app.muestra_frcst();
}

app.muestra = function() {
  $('#portada').attr("src",app.portada);

  $('#temp_big').html(app.temperatura + " ºC");

  $('#js_w_munic').html(app.municipio);
  $('#js_w_icon').attr("src",app.icono);
  $('#js_w_temp_icon').attr("src",iconoTemp);
  $('#js_w_temp').html(app.temperatura + " ºC");
  $('#js_w_wind_Icon').attr("src",iconoWind);
  $('#js_w_windS').html(app.windSpeed + " m/s");
  $('#js_w_windD').html(app.windDir + " º");
  $('#js_w_humedad').html(app.humedad + " %");
  $('#js_w_humedad_Icon').attr("src",iconoHumedad);
}
app.muestra_frcst = function() {
  for (i=0;i<7;i++){
    var j = i.toString();
    $('#dia_sem_frcst_'+j).html(getDiaSemana(app.fecha_frcst[i].getDay()) + " ");
    $('#dia_mes_frcst_'+j).html(app.fecha_frcst[i].getDate() + " ");
    $('#mes_frcst_'+j).html(getMes(app.fecha_frcst[i].getMonth()));
    $('#icon_frcst_'+j).attr("src",app.icono_frcst[i]);
    $('#tmp_frcst_max_'+j).html(app.temp_max_frcst[i] + " ºC <");
    $('#tmp_frcst_min_'+j).html("> " + app.temp_min_frcst[i] + " ºC");
    $('#wind_frcst_vel_'+j).html(app.windSpeed_frcst[i] + " m/s");
    $('#wind_frcst_dir_'+j).html(app.windDir_frcst[i] + " º");
    $('#humedad_frcst_'+j).html(app.humedad_frcst[i] + " %");
  }
}

function getDiaSemana(diaEN){
  var diaES = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  return diaES[diaEN];
}

function getMes(mesNum){
  var mes = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return mes[mesNum];
}