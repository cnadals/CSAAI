// Carmen Nadal Serrano

// ID DE LAS FUENTES DE LOS VIDEOS

var myVideo1 = document.getElementById("video1");
var myVideo2 = document.getElementById("video2");
var myVideo3 = document.getElementById("video3");
var myVideo4 = document.getElementById("video4");
var myVideo5 = document.getElementById("video5");

// VARIABLES GLOBALES
var playing = false;
var looping = false;
var lowerinterval = 0;
var upperinterval = 0;
var time = 0;

// intervalo de tiempo en el que actualiza el contardor del tiempo
setInterval(updateTimer, 10);

// comprueba cada 10ms si se ha superado el upper interval
setInterval(rewind, 10);

// contador de tiempo
function updateTimer(){
  // actualiza el segundo que se esta reproduciendo
  document.getElementById("TiempoV1").innerHTML = video1.currentTime;
}


function rewind(){
  time = myVideo1.currentTime;
  if (looping && time > upperinterval){
    time = lowerinterval; // actualizo time
    myVideo1.currentTime = time; // actualizo el segundo que estoy reproduciendo con el time
  }
}

// funcion que define los parametros from y to de reproduccion del video
function setParameters(){
  lowerinterval = document.getElementById("from").value;
  upperinterval = document.getElementById("to").value;
  //console.log(lowerinterval,upperinterval);
}

function play(){
  myVideo1.play();
  myVideo2.play();
  myVideo3.play();
  myVideo4.play();
  myVideo5.play();
  playing = true;
}

function pause(){
  myVideo1.pause();
  myVideo2.pause();
  myVideo3.pause();
  myVideo4.pause();
  myVideo5.pause();
  playing = false;
}

function playPause() {
    if (myVideo1.paused){
        play();
        playPauseButton.textContent = "Pause";
    }else{
        pause();
        playPauseButton.textContent = "Play";
    }
}


function loopHandler() {
    if (looping){
        // si esta looping, pararlo
        loopButton.textContent = "Enable Loop";
        looping = false;
    }else{
        // si no esta en looping, activarlo
        loopButton.textContent = "Disable Loop";
        looping = true;
    }
    console.log(looping);
}

// sincronizar los videos: todos en reproduccion/parados
function keepFlow() {
    if (!playing){
        pause();
    }else{
        play();
    }
}


function makeBig() {
    myVideo1.width += 60;
}

function makeSmall() {
    myVideo1.width -= 60;
}


function makeNormal() {
    myVideo1.width = 540;
}

// cambio de video
function changeVideo(value) {
  time = myVideo1.currentTime;
  myVideo1.src = "realizador-fuente" + value + ".mp4";
  myVideo1.currentTime = time;
  keepFlow();
}

// se reproduce el audio del video solo cuando el raton esta encima
function mouseOver(id, value) {
  console.log(id, "silenced: " + value);
  // genera y ejecuta codigo JS
  eval('myVideo' + id + ".muted = " + value);
}
