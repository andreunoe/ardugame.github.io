//Variables de imágenes de la moto, el fondo, y de los botones
let motoImg, motoImg2, juegoMoto, fondoImg, fondoImg2, fondoplay; //Moto y fondo
let musicaConf1, musicaConf2, imagenConf1, imagenConf2, motoConf1, motoConf2; //Botones de configuración
let botonconfiguracion1, botonjugar1, botonsalir1, botonVolverMenu; //Botones del menú

// Variables globales
let obstaculos = [];
let moto;
let score = 0;
let puntos = 0;
let highScore = 0;
let gameOver = false;

//Creamos las variables del menú y les asignamos su estado
let option; 
let INICIO = 0;
let MENU = 1;
let CONFIGURACION = 2;
let JUGAR = 3;
let SALIR = 4;

let clock; //Clase clock
let timer; //Clase timer

function preload() {
  //Cargamos imágenes
  fondoImg = loadImage("data-spaceride/fondo_juego1.jpg");
  fondoImg2 = loadImage("data-spaceride/fondo_juego2.jpg");
  motoImg = loadImage("data-spaceride/motorista1.png");
  motoImg2 = loadImage("data-spaceride/motorista2.png");
  botonconfiguracion1 = loadImage("data-spaceride/valor2.png");
  botonjugar1 = loadImage("data-spaceride/valor3.png");
  botonsalir1 = loadImage("data-spaceride/valor4.png");
  botonVolverMenu = loadImage("data-spaceride/volver.png");
  musicaConf1 = loadImage("data-spaceride/Musica1.png");
  musicaConf2 = loadImage("data-spaceride/Musica2.png");
  imagenConf1 = loadImage("data-spaceride/Imagen1.png");
  imagenConf2 = loadImage("data-spaceride/Imagen2.png");
  motoConf1 = loadImage("data-spaceride/Moto1.png");
  motoConf2 = loadImage("data-spaceride/Moto2.png");
   //Introducimos los diferentes sonidos
   music =  loadSound("data-spaceride/90's Video Game.mp3"); //Musica principal
   effectclick = loadSound("data-spaceride/bambu_1.mp3"); //Efecto del boton
   effectback = loadSound("data-spaceride/atrasmenu.mp3"); //Efecto del boton
   music2 = loadSound("data-spaceride/music2.mp3"); //Musica principal
   effecthit = loadSound("data-spaceride/hit.mp3"); //Sonido para el choque
   effectstarted = loadSound("data-spaceride/start.mp3"); //Sonido para empezar
   effectjump = loadSound("data-spaceride/saltar.mp3"); //Sonido para salto
}

function setup() {
  createCanvas(800, 600);
  
  fondoplay = fondoImg;

  option = INICIO; //Estamos en la pantalla de inicio

  music.play(); //Reproducimos la música

  moto = new Moto(); //Creamos una nueva moto
  juegoMoto = motoImg;

  clock = new Clock(); //Inicializamos la variable de clase clock
  timer = new Timer(); //Inicializamos la variable de clase timer
}

function draw() {
  background(255);

  clock.update(); //Iniciamos la función update de la clase clock
  timer.update(clock.TimeMillis()); //Iniciamos la clase timer

  switch (option) {
    case INICIO:
      timecount(); //Comenzamos a contar
      background(0);
      fill(250);
      rect(130, 220, 520, 50);
      textAlign(CENTER, CENTER);
      textSize(20);
      fill(50, 100, 270);
      text("Bienvenidos a Space-Ride", 400, 240);
      break;

    case MENU:
      background(196, 234, 242);
      fill(0);
      textSize(30);
      text("Space-Ride", 400, 50);
      //Botones del menú
      image(botonconfiguracion1, 350, 150);
      image(botonjugar1, 350, 200);
      image(botonsalir1, 350, 250);
      break;

    case CONFIGURACION:
      background(196, 234, 242);
      fill(0);
      textSize(15);
      text("SELECCIONA LA MUSICA:", 150, 130);
      fill(0);
      textSize(15);
      text("SELECCIONA LA IMAGEN:", 150, 280);
      fill(0);
      textSize(15);
      text("SELECCIONA EL PERSONAJE:", 150, 430);

      //Botones de configuración
      image(musicaConf1, 300, 150, 100, 30);
      image(musicaConf2, 300, 200, 100, 30);
      image(motoConf1, 300, 450, 100, 30);
      image(motoConf2, 300, 500, 100, 30);
      image(imagenConf1, 300, 300, 100, 30);
      image(imagenConf2, 300, 350, 100, 30);
    
      image(botonVolverMenu, 100, 550); //Botón de volver al menú
      break;

    case JUGAR:
      background(fondoplay); //Fondo del juego
      image(botonVolverMenu, 100, 550); //Botón de volver al menú
      //Juego
      moto.actualizar();
      moto.mostrar();
      if (!gameOver) {
        moto.mostrar();
        moto.actualizar();
      }
      if (frameCount % 100 == 0 && !gameOver) {
        obstaculos.push(new Rectangulo(width, height - 100, 40, random(40, 90)));
      }
      for (let i = obstaculos.length - 1; i >= 0; i--) {
        let r = obstaculos[i];
        r.mostrar();
        r.mover();
        if (moto.colisiona(r)) {
          gameOver = true;
        }
        if (!gameOver && r.x < -r.ancho) {
          obstaculos.splice(i, 1);
          score++;
          puntos = score;
        }
      }
      if (score > highScore) {
        highScore = score;
      }
      fill(255);
      textSize(20);
      text("Puntuación: " + score, 100, 30);
      fill(255, 0, 0);
      text("Record: " + highScore, 250, 30);
      if (gameOver) {
        background(0);
        fill(255, 0, 0);
        textSize(40);
        textAlign(CENTER);
        text("Game Over", width / 2, height / 2);
        fill(0, 255, 0);
        textSize(30);
        text("Puntuación: " + puntos, width / 2, (height / 2) + 50);
        fill(255);
        textSize(15);
        text("Pulsa 'p' para reiniciar la partida", width / 2, (height / 2) + 100);
        score = 0;
      }
      break;

    case SALIR:
      background(0);
      if (timer.TimeSeconds() <= 5) {
        fill(255);
        textAlign(CENTER, CENTER);
        text("¡Gracias por jugar a Space-Ride!", 400, 250);
      } else if (timer.TimeSeconds() > 5) {
        exit();
      }
      break;
  }
}

function keyPressed() {
  if ((key == 's' || key == 'S') && !gameOver) { //Si pulsamos la s y no hemos perdido
    moto.saltar(); //Saltamos
  } else if (gameOver && (key == 'p' || key == 'P')) { //Si pulsamos la p y hemos perdido
    reiniciarJuego(); //Reiniciamos el juego
  }
}

//Creamos la función que reinicia el juego
function reiniciarJuego() {
  obstaculos = [];
  moto = new Moto();
  score = 0;
  gameOver = false;
}

//Creamos la función que cuenta el tiempo
function timecount() {
  if (millis() <= 5000) {
    option = INICIO;
  } else if (millis() > 5000) {
    option = MENU;
  }
}

//Clase clock
class Clock {
  constructor() {
    this.time_now = 0;
    this.time_old = 0;
    this.time_millis = 0;
  }

  update() {
    this.time_now = millis();
    this.time_millis = this.time_now - this.time_old;
    this.time_old = this.time_now;
  }

  TimeMillis() {
    return this.time_millis;
  }
}

//Clase timer
class Timer {
  constructor() {
    this.up = true;
    this.counting = false;
    this.currentTime = 0;
  }

  update(millis) {
    if (this.counting) {
      if (this.up) {
        this.currentTime += millis;
      } else {
        this.currentTime -= millis;
      }
    }
  }

  start(onoff) {
    this.counting = onoff;
  }

  TimeSeconds() {
    return (this.currentTime / 1000.0);
  }
}

//Clase moto
class Moto {
  constructor() {
    this.x = 100;
    this.y = height - 100;
    this.vy = 0;
    this.gravedad = 0.3;
  }

  mostrar() {
    image(juegoMoto, this.x, this.y - 75, 80, 80);
  }

  actualizar() {
    this.y += this.vy;
    this.vy += this.gravedad;
    this.y = constrain(this.y, 0, height - 100);
  }

  saltar() {
    if (this.y == height - 100) {
      this.vy = -12;
    }
  }

  colisiona(r) {
    return (this.x + 80 > r.x && this.x < r.x + r.ancho &&
            this.y + 80 > r.y && this.y < r.y + r.alto);
  }
}

//Clase rectángulo
class Rectangulo {
  constructor(x, y, ancho, alto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
  }

  mostrar() {
    fill(255);
    rect(this.x, this.y - this.alto, this.ancho, this.alto);
  }

  mover() {
    this.x -= 5;
  }
}

//Creamos la función que detectará cuando y donde hacemos click
function mouseClicked(){
    switch (option){
      case INICIO:
        //No tenemos botones en la pantalla de inicio
        break;
      case MENU:
        //Si hacemos clic en el botón de configuración
        if (mouseX > 360 && mouseX < 450 && mouseY > 150 && mouseY < 180) {
          configuracion(); // Cambiar a la pantalla de configuración
        }
        //Si hacemos se hizo clic en el botón de jugar
        else if (mouseX > 360 && mouseX < 450 && mouseY > 200 && mouseY < 230) {
          jugar(); // Cambiar a la pantalla de juego
        }
        //Si hacemos se hizo clic en el botón de salir
        else if (mouseX > 360 && mouseX < 450 && mouseY > 250 && mouseY < 280) {
          salir(); // Cambiar a la pantalla de salida
        }
        break;
      case CONFIGURACION:
        //Botones de configuración
        if (mouseX > 300 && mouseX < 400 && mouseY > 150 && mouseY < 180) {
            musica1();
        } else if (mouseX > 300 && mouseX < 400 && mouseY > 200 && mouseY < 230) {
            musica2();
        } else if (mouseX > 300 && mouseX < 400 && mouseY > 300 && mouseY < 330) {
            imagen1();
        } else if (mouseX > 300 && mouseX < 400 && mouseY > 350 && mouseY < 380) {
            imagen2();
        } else if (mouseX > 300 && mouseX < 400 && mouseY > 450 && mouseY < 480) {
            moto1();
        } else if (mouseX > 300 && mouseX < 400 && mouseY > 500 && mouseY < 530) {
            moto2();
        } else if (mouseX > 110 && mouseX < 190 && mouseY > 550 && mouseY < 580) {
            volvermenu();
        }
        break;
      case JUGAR:
        //Botón de volver al menú
        if (mouseX > 110 && mouseX < 190 && mouseY > 550 && mouseY < 580) {
            volvermenu();
        }
        break;
      case SALIR:
        //No tenemos botones en la pantalla de salida
        break;
    }
}

//Creamos las funciones que cambian de pantalla o los parámetros de la configuración
  function configuracion(value) { //Entramos a la pantalla configuración
    option = CONFIGURACION; //Nos lleva a la pantalla de configuración
    effectclick.play(); //El botón suena al pulsarlo
  }
  
  function jugar(value) { //Entramos a la pantalla jugar
    option = JUGAR;
    effectclick.play();
  }
  
  function salir(value) { //Salimos del juego
    option = SALIR;
    effectclick.play();
    music.stop();
    music2.stop();
    timer.start(true);
  }
  
  function volvermenu(value) { //Volvemos al menú
    option = MENU;
    reiniciarJuego();
    effectback.play();
  }
  
  //Cambiamos la música
  function musica1() {
    music2.stop();
    music.play();
    effectback.play();
  }
  
  function musica2() {
    music.stop();
    music2.play();
    effectback.play();
  }
  
  //Cambiamos el fondo
  function imagen1() {
    background(fondoImg);
    fondoplay = fondoImg;
    effectback.play();
  }
  
  function imagen2() {
    background(fondoImg2);
    fondoplay = fondoImg2;
    effectback.play();
  }
  
  //Cambiamos la moto
  function moto1() {
    juegoMoto = motoImg;
    effectback.play();
  }
  
  function moto2() {
    juegoMoto = motoImg2;
    effectback.play();
  }