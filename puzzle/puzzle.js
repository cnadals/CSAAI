// CARMEN NADAL SERRANO

// VARIABLES GLOBALES
var currentImage = 0; // imagen (1 a 9)
var currentPuzzle = []; // celda (0 al 7) + blanco

var solution = [0, 1, 2, 3, 4, 5, 6, 7, "White"];
var carouselRecord = [0,1,2];

var time = 0;

function chooseImage(){
  // Random carpeta de imagen
  currentImage = Math.floor((Math.random() * 9) + 1);
  time = 0;
  for (i = 0; i < 9; i++){
    // CARPETA/0-9/IMAGEN.JPEG
    imgPath = "./Images/" + currentImage + "/" + i + ".jpeg";
    id = "p" + i;
    image = document.getElementById(id); // id de cada celda de la tabla
    image.src = imgPath;
  }
}


function randomize(){
  currentPuzzle = [];
  time = 0;
  for (a = [0, 1, 2, 3, 4, 5, 6, 7], i = a.length; i--;) {
    // splice: saco elemento de A
    // añado a la funcion random
    // se lo paso a current puzzle
    var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    currentPuzzle.push(random);
  }
  currentPuzzle.push("White");
  for (i = 0; i < 9; i++){
    imgPath = "./Images/" + currentImage + "/" + currentPuzzle[i] + ".jpeg";
    id = "p" + i;
    image = document.getElementById(id);
    image.src = imgPath;
  }
}


function draw(){
  for (i = 0; i < 9; i++){
    imgPath = "./Images/" + currentImage + "/" + currentPuzzle[i] + ".jpeg";
    id = "p" + i;
    image = document.getElementById(id);
    image.src = imgPath;
  }
}


function check(){
  // cantidad de piezas que coinciden
  var equal = 0;
  for (i = 0; i < 9; i++){
    if (solution[i] == currentPuzzle[i]){
      equal += 1;
    }
    if(equal == 9){
      alert("you win");
      chooseImage();
    }
  }
}


function solve(){
  currentPuzzle = [0, 1, 2, 3, 4, 5, 6, 7, "white"];
  draw();
}

// CARROUSEL: representa las imagenes de arriba
// cuando llego al 9 que es mi ultima imagen, empiezo en 1
function nextImg(x){
  if(x == 9){
    x = 1;
  }else{
    x += 1;
  }
    return x;
}


function tryMove(Pos){
  whitePos = currentPuzzle.indexOf("White");
  allowMovements = [
                   [1,3],
                   [0,2,4],
                   [1,5],
                   [0,4,6],
                   [1,3,5,7],
                   [2,4,8],
                   [3,7],
                   [4,6,8],
                   [5,7]
                   ];

  possible = allowMovements[Pos].indexOf(whitePos);

  if (possible != -1){
    aux = currentPuzzle[Pos];
    currentPuzzle.splice(Pos,1,currentPuzzle[whitePos]);
    currentPuzzle.splice(whitePos,1,aux);
    }
    draw();
    check();
}


function ClickCarrousel(id){
  currentImage = carouselRecord[id];
  time = 0;
  for (i = 0; i < 9; i++){
    // CARPETA/0-9/IMAGEN.JPEG
    imgPath = "./Images/" + currentImage + "/" + i + ".jpeg";
    id = "p" + i;
    image = document.getElementById(id); // id de cada celda de la tabla
    image.src = imgPath;
  }
}


function changeCarrousel(){
  for (i = 0; i < 3; i++){
    next = nextImg(carouselRecord[i]);
    carouselRecord.splice(i, 1, next);
    imgPath = "./Images/0/" + next + ".jpg";
    id = "c" + i;
    image = document.getElementById(id);
    image.src = imgPath;
  }
}


function timer(){
  time += 1;
  document.getElementById("timer").innerHTML = "Time: " + time;
}


function main(){
  setInterval(changeCarrousel, 5000);
  setInterval(timer, 1000);
}
