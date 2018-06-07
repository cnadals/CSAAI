// Carmen Nadal Serrano

// PacMan

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var player = [];
var points = [];
var keys = {};
var walls = [
            // limites horizontales
            // (x,y,x,y)
            [30.69, 30.69, 568.62, 30.69],
            [72.07, 72.07, 237.59, 72.07],
            [278.92, 72.07, 320.34, 72.07],
            [361.72, 72.07, 527.24, 72.07],
            [113.45, 113.45, 485.86, 113.45],
            [92.76, 154.83, 258.28, 154.83],
            [341.03, 154.83, 506.55, 154.83],
            [113.45, 196.21, 216.90, 196.21],
            [382.41, 196.21, 485.86, 196.21],
            [113.45, 237.59, 175.52, 237.59],
            [423.79, 237.59, 485.86, 237.59],
            [113.45, 278.97, 485.86, 279.97],
            [113.45, 320.34, 258.28, 320.34],
            [341.03, 320.34, 485.86, 320.34],
            [113.45, 361.72, 175.52, 361.72],
            [423.79, 361.72, 485.86, 361.72],
            [113.45, 403.10, 216.90, 403.10],
            [382.41, 403.10, 485.86, 403.10],
            [92.76, 444.48, 258.28, 444.48],
            [341.03, 444.48, 506.55, 444.48],
            [113.45, 485.86, 485.86, 485.86],
            [72.07, 527.24, 237.59, 527.24],
            [278.97, 527.24, 320.34, 527.24],
            [361.72, 527.24, 527.24, 527.24],
            [30.69, 568.62, 568.62, 568.62],

            // limites verticales
            // (x,y,x,y)
            [30.69, 51.38, 30.69, 547.93],
            [72.07, 92.76, 72.07, 258.28],
            [72.07, 341.03, 72.07, 506.55],
            [216.90, 216.90, 216.90, 237.59],
            [216.90, 361.72, 216.90, 382.41],
            [258.28, 196.21, 258.28, 237.59],
            [258.28, 361.72, 258.28, 403.10],
            [299.66, 134.14, 299.66, 237.59],
            [299.66, 320.34, 299.66, 465.17],
            [341.03, 196.21, 341.03, 237.59],
            [341.03, 361.72, 341.03, 403.10],
            [382.41, 216.90, 382.41, 237.59],
            [382.41, 361.72, 382.41, 382.41],
            [527.24, 92.76, 527.24, 258.28],
            [527.24, 341.03, 527.24, 506.55],
            [568.62, 51.38, 568.62, 547.93],

            // puntos blancos
            [72.07, 299.66, 72.07, 299.66],
            [299.66, 92.76, 299.66, 92.76],
            [527.24, 299.66, 527.24, 299.66],
            [299.66, 506.55, 299.66, 506.55]
            ];

var ghostsCoords = [
                   [216.89655172413794, 258.2758620689655],
                   [278.9655172413793, 258.2758620689655],
                   [341.0344827586207, 258.2758620689655],
                   [382.41379310344826, 258.2758620689655]
                   ];

var ghostsColor = ["rgb(255, 0, 0)",
                   "rgb(102, 255, 255)",
                   "rgb(255, 128, 0)",
                   "rgb(255, 153, 255)"
                   ];

// direcciones iniciales que toman los fantasmas
var ghostsDir = ["left", "left", "right", "right"];

var enemies = [];

// direcciones aleatorias de los fantasmas si colisionan
var newDir = ["left", "right", "up", "down"];

var lives = 3;


// FUNCION PRINCIPAL
function Pacman(x, y, radius, color, dir, enemy){
  // objetos de la funcion
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = radius;
  this.dir = dir;
  this.auxX = this.x;
  this.auxY = this.y;
  this.enemy = enemy;

  // DIBUJA LOS CIRCULOS
  this.update = function(){
    ctx.save();
    // empezar a dibujar una figura
    ctx.beginPath();
    // ARC: dibujo de un arco (pos x, pos y, 0, 2pi)
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    // color del circulo
    ctx.fillStyle = this.color;
    // rellena el interior del circulo
    ctx.fill();
    // acabar de dibujar la figura
    ctx.closePath();
    ctx.restore();
  }

  this.move = function(){
    // aux: compruebo si colisionan
    this.auxX = this.x;
    this.auxY = this.y;
    switch (this.dir) {
      // desplazamiento segun direccion
      case "up":
        this.auxY = this.y - (canvas.width/((canvas.width/(2*player[0].radius)) - 1));
        break;
      case "down":
        this.auxY = this.y + (canvas.width/((canvas.width/(2*player[0].radius)) - 1));
        break;
      case "left":
        this.auxX = this.x - (canvas.height/((canvas.height/(2*player[0].radius)) - 1));
        break;
      case "right":
        this.auxX = this.x + (canvas.height/((canvas.height/(2*player[0].radius)) - 1));
        break;
      default:
    }

    // si no colisiona con los muros ni en X ni en Y
    if (!onWalls((this.auxX).toFixed(2), (this.auxY).toFixed(2))){
      // actualizo la posicion
      this.x = this.auxX;
      this.y = this.auxY;
    }else if (this.enemy){
      // si eres enemigo y te chocas, elige direccion aleatoria de 0 a 3 del array newdir
      d = Math.floor(Math.random()*4);
      this.dir = newDir[d];
    }else{
      // si no, parar el circulo del comecocos
      this.dir = "";
    }
  }
}

// FUNCION DE MOVIMIENTO DE LAS FLECHAS
// keycode.info, el valor de la tecla de key
function keyHandler() {
    if(keys && keys[32]){player[0].dir = "";} //stop
    if(keys && keys[37]){player[0].dir = "left";}
    if(keys && keys[38]){player[0].dir = "up";}
    if(keys && keys[39]){player[0].dir = "right";}
    if(keys && keys[40]){player[0].dir = "down";}

}


function checkWin(){
  if (points.length == 0){
    alert("You Win");
  }
}


function checkLose(){
  if (lives == 0){
    alert("Game Over");
  }
}


function draw(){
  // limpiar
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // dibujo el circulo del comecocos
  player[0].update();
  // miro si colisionan los fantasmas con el comecocos
  playerGhostCollision();
  // miro si me como un punto rojo
  eatPoint((player[0].x).toFixed(2), (player[0].y).toFixed(2));
  // movimiento
  player[0].move();
  // dibujo el escenario resultante
  for(i = 0; i < points.length; i++){
    points[i].update();
  }
  for(j = 0; j < enemies.length; j++){
    enemies[j].update();
    enemies[j].move();
  }
  checkWin();
  checkLose();
}

// si mi pelota esta dando en los limites, me paro
function onWalls (x, y){
  onTheWall = false;
  for(i = 0; i <= walls.length-1; i++){
    // si mi punto se encuentra dentro de los valores limite de los muros, choca - true (false??????)
    if(walls[i][0] <= x && walls[i][2] >= x && walls[i][1] <= y && walls[i][3] >= y){
      onTheWall = true;
    }
  }
  return onTheWall;
}

// comerse los puntitos rojos
function eatPoint(x, y){
  for (i = 0; i < points.length; i++){
    if(x == points[i].x && y == points[i].y){
      points.splice(i, 1);
    }
  }
}


function resetGame(){
  // si se resetea el juego por Game Over, posicion X e Y vuelven al principio
  player[0].x = 299.65517241379314;
  player[0].y = 299.65517241379314;

  lives -= 1;

  // reiniciar la posicion de los fantasmas
  for (i = 0; i < enemies.length; i++){
    enemies[i].x = ghostsCoords[i][0];
    enemies[i].y = ghostsCoords[i][1];
  }
}


// comprobar si fantasma y comecocos estan en la misma posicion
function playerGhostCollision(){
  dead = false;
  for (i = 0; i < enemies.length ; i++){
    if((enemies[i].x).toFixed(2) == (player[0].x).toFixed(2) && (enemies[i].y).toFixed(2) == (player[0].y).toFixed(2)){
      dead = true;
    }
  }
  if(dead){resetGame();}
}


function start(){

  // POSICION PRINCIPAL DEL PACMAN Y EL COLOR
  // pacman(x, y, radio bolita, color, direccion inicial, es o no enemigo)
  player.push(new Pacman(299.65517241379314, 299.65517241379314, 10, "rgb(255, 255, 0)", "", false));

  // TECLAS - W3S
  onkeydown = onkeyup = function(e){
      e = e || event;
      keys[e.keyCode] = e.type == 'keydown';
      // console.log(keys);
      // genera para cada tecla un valor
      // guarda el key de la tecla
  }
  // ejecuta la funcion cuando pulsas/dejas de pulsar
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('keyup', keyHandler);

  // dibuja el canvas
  setInterval(draw, 200);

  // DIMENSIONES DEL CANVAS DIVIDIDO
  // canvas.width/(2*player[0].radius)) = 30
  for(x = 2; x < 30 - 2; x++){
    for(y = 2; y < 30 - 2; y++){
      // toFixed: quitar (x) decimales
      pointx = ((canvas.width/((canvas.width/(2*player[0].radius)) - 1))* x + player[0].radius).toFixed(2);
      pointy = ((canvas.height/((canvas.height/(2*player[0].radius)) - 1))* y + player[0].radius).toFixed(2);
      // definicion de las coordenadas del canvas
      console.log(pointx, pointy);

      if(!onWalls(pointx, pointy)){;
        // añadir puntos rojos pequeños donde no hay lineas blancas
        points.push(new Pacman(pointx, pointy, 3, "red", "", false));
      }
    }
  }

  for (i = 0; i < ghostsCoords.length; i++){
    // pacman(x, y, radio bolita, color, direccion inicial, es o no enemigo)
    enemies.push(new Pacman(ghostsCoords[i][0], ghostsCoords[i][1], 10, ghostsColor[i], ghostsDir[i], true));
  }
}
