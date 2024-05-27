let maze; // Variable que contendrá el laberinto
let player; // Variable que contendrá el jugador
let score; // Variable que guardará nuestra puntuación
let tamanoX, tamanoY; // Variables que indican el tamaño por defecto de los laberintos
let estadoMenu = 0; // Inicializamos en cero la variable que contiene la pantalla del juego
let tiempoInicio; // Variable que contendrá el tiempo de las partidas

function setup(){
  createCanvas(600, 600); // Tamaño de la ventana
  score = 0; // La puntuación empieza en cero
  // Tamaño del laberinto por defecto 20x20
  tamanoX = floor(random(10, 26));
  tamanoY = floor(random(10, 26));
  
  maze = new Laberinto(tamanoX, tamanoY); // Creamos un nuevo laberinto
  maze.genera(0, 0); // Invocamos a la función que crea los caminos de los laberintos en las cuatro direcciones
  
  // Inicializamos las paredes de arriba de la primera celda y de la derecha de la última celda como falsas para establecer un principio y un final
  maze.celdas[0][0].paredA = false;
  maze.celdas[maze.ancho - 1][maze.alto - 1].paredD = false;
  
  player = new Jugador(0, 0, maze); // Creamos un nuevo jugador

  // Prevenir el desplazamiento de la pantalla con las flechas del teclado
  window.addEventListener("keydown", function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);
}

function draw() {
  background(255); // Color de fondo
  
  switch (estadoMenu) { // Creamos switch para controlar la pantalla del juego
    case 0: // Mostramos el menú
      mostrarMenu(); // Invocamos la función que crea el menú
      break;
    case 1: // Empezamos el juego
      background(250, 228, 188); // Color de fondo
      // Texto con la puntuación
      fill(0, 0, 255);
      textSize(20);
      textAlign(CENTER, TOP);
      text("Puntuación: " + score, 150, 565);
      
      if (millis() - tiempoInicio > 90000) { // Si superamos los 90 segundos haciendo un laberinto
        background(0); // Pantalla en negro
        // Creamos un recuadro con un texto para indicar que el jugador ha perdido la partida y su puntuación
        fill(255);
        rect(200, 400, 200, 100);
        textSize(30);
        fill(150, 100, 150);
        text("¡Has perdido!", width / 2, height / 2 + 120);
        text("Puntuación: " + score, width / 2, height / 2 + 170);
        // Creamos un botón para salir
        fill(150, 100, 150);
        rect(250, 530, 100, 20);
        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("Salir", 300, 538);
        
      } else { // Si el tiempo es menor de 90 segundos
        player.desplaza(); // Invocamos la función que desplaza el jugador
        
        // Creamos un texto en el que nos irá indicando el tiempo que llevamos en la partida para que controlemos los 90 segundos
        if((millis() - tiempoInicio) / 1000 < 80) {
          fill(50, 150, 50);
        } else if((millis() - tiempoInicio) / 1000 > 80 && (millis() - tiempoInicio) / 1000 <= 90) {
          fill(255, 0, 0);
        }
        textSize(15);
        text("Tiempo: " + floor((millis() - tiempoInicio) / 1000) + "s", 380, 565);
        
        // Creamos una condición para controlar los movimientos y las direcciones en función de la flecha que pulsemos
        if (player.x == player.ax && player.y == player.ay) {
          if (keyIsPressed) { // Si pulsamos una tecla
            if (keyCode == UP_ARROW) { // Flecha hacia arriba
              player.mueve(0, -1); // Movemos el jugador hacia arriba
            }
            if (keyCode == DOWN_ARROW) { // Flecha hacia abajo
              player.mueve(0, 1); // Movemos el jugador hacia abajo
            }
            if (keyCode == LEFT_ARROW) { // Flecha hacia la izquierda
              player.mueve(-1, 0); // Movemos el jugador hacia la izquierda
            }
            if (keyCode == RIGHT_ARROW) { // Flecha hacia la derecha
              player.mueve(1, 0); // Movemos el jugador hacia la derecha
            }
          }
        }
      }
      
      maze.dibujarLaberinto(); // Invocamos la función que dibuja el laberinto
      player.dibujaJugador(); // Invocamos la función que genera el jugador

      maze.completado(); // Invocamos la función que genera un nuevo laberinto y desplaza el jugador a la posición inicial cada vez que completemos uno
      break;
  }
}

function mostrarMenu() { // Creamos la función que contiene el menú
  background(50, 50, 200); // Color de fondo
  
  // Título
  fill(255);
  textSize(25);
  textAlign(CENTER, TOP);
  text("LABERINTO", 300, 50);

  // Botón para jugar
  fill(0, 200, 50);
  rect(250, 200, 100, 40);
  fill(0);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("Jugar", 300, 218);

  // Botón para salir
  fill(200, 50, 0);
  rect(250, 270, 100, 40);
  fill(0);
  text("Salir", 300, 288);
}

function mousePressed() { // Creamos una función para controlar si pulsamos el ratón
  switch (estadoMenu) { // Controlamos los botones de las diferentes pantallas
    case 0: // Pantalla del menú
      if (mouseX > 250 && mouseX < 350 && mouseY > 200 && mouseY < 240) { // Si pulsamos en las coordenadas del botón de jugar
        estadoMenu = 1; // Iniciamos el juego
        tiempoInicio = millis(); // Actualizamos la variable del tiempo
      } else if (mouseX > 250 && mouseX < 350 && mouseY > 270 && mouseY < 310) { // Si pulsamos en las coordenadas del botón de salir
        exit(); // Salimos del juego
      }
      break;
    
    case 1: // Pantalla del juego
      if (mouseX > 250 && mouseX < 350 && mouseY > 530 && mouseY < 550) { // Si pulsamos en las coordenadas del botón de salir cuando perdemos
        exit(); // Salimos del juego
      }
  }
}

// Clase que formará las celdas que juntas darán lugar al laberinto
class Celda { 
  constructor() {
    this.paredA = true;
    this.paredD = true;
    this.paredI = true;
    this.paredB = true;
    this.encontrada = false;
  }
  
  dibujarCelda(x, y) {
    stroke(0);
    if(this.paredA) {
      line(x * 25, y * 25, (x + 1) * 25, y * 25);
    }
    if(this.paredD) {
      line((x + 1) * 25, y * 25, (x + 1) * 25, (y + 1) * 25);
    }
    if(this.paredI) {
      line(x * 25, y * 25, x * 25, (y + 1) * 25);
    }
    if(this.paredB) {
      line(x * 25, (y + 1) * 25, (x + 1) * 25, (y + 1) * 25);
    }
  }
}

// Clase que creará el laberinto
class Laberinto {
  constructor(ancho, alto) {
    this.ancho = ancho;
    this.alto = alto;
    this.celdas = [];
    
    for(let i = 0; i < this.ancho; i++) {
      this.celdas[i] = [];
      for(let j = 0; j < this.alto; j++) {
        this.celdas[i][j] = new Celda();
      }
    }
  }
  
  genera(x, y) {
    this.celdas[x][y].encontrada = true;
    let direcciones = [];
    
    if (x > 0 && !this.celdas[x - 1][y].encontrada) {
      direcciones.push([-1, 0]);
    }
    if (x < this.ancho - 1 && !this.celdas[x + 1][y].encontrada) {
      direcciones.push([1, 0]);
    }
    if (y > 0 && !this.celdas[x][y - 1].encontrada) {
      direcciones.push([0, -1]);
    }
    if (y < this.alto - 1 && !this.celdas[x][y + 1].encontrada) {
      direcciones.push([0, 1]);
    }
    
    while (direcciones.length > 0) {
      let indice = floor(random(0, direcciones.length));
      let nx = x + direcciones[indice][0];
      let ny = y + direcciones[indice][1];
      
      direcciones.splice(indice, 1);
      
      if (!this.celdas[nx][ny].encontrada) {
        if (nx < x) {
          this.celdas[x][y].paredI = false;
          this.celdas[nx][ny].paredD = false;
        } else if (nx > x) {
          this.celdas[x][y].paredD = false;
          this.celdas[nx][ny].paredI = false;
        } else if (ny < y) {
          this.celdas[x][y].paredA = false;
          this.celdas[nx][ny].paredB = false;
        } else if (ny > y) {
          this.celdas[x][y].paredB = false;
          this.celdas[nx][ny].paredA = false;
        }
        this.genera(nx, ny);
      }
    }
  }
  
  dibujarLaberinto() {
    for (let x = 0; x < this.ancho; x++) {
      for (let y = 0; y < this.alto; y++) {
        this.celdas[x][y].dibujarCelda(x, y);
      }
    }
  }
  
  completado() {
    if (player.x == this.ancho - 1 && player.y == this.alto - 1) {
      this.ancho++;
      this.alto++;
      this.celdas = [];
      
      for(let i = 0; i < this.ancho; i++) {
        this.celdas[i] = [];
        for(let j = 0; j < this.alto; j++) {
          this.celdas[i][j] = new Celda();
        }
      }
      
      this.genera(0, 0);
      this.celdas[0][0].paredA = false;
      this.celdas[this.ancho - 1][this.alto - 1].paredD = false;
      
      player.x = 0;
      player.y = 0;
      player.ax = 0;
      player.ay = 0;
      
      score++;
      tiempoInicio = millis();
    }
  }
}

// Clase que creará al jugador
class Jugador {
  constructor(x, y, maze) {
    this.x = x;
    this.y = y;
    this.ax = x;
    this.ay = y;
    this.maze = maze;
  }
  
  dibujaJugador() {
    fill(255, 0, 0);
    noStroke();
    ellipse((this.x + 0.5) * 25, (this.y + 0.5) * 25, 20, 20);
  }
  
  mueve(dx, dy) {
    let nx = this.x + dx;
    let ny = this.y + dy;
    
    if (nx >= 0 && ny >= 0 && nx < this.maze.ancho && ny < this.maze.alto) {
      if (dx == 1 && !this.maze.celdas[this.x][this.y].paredD) {
        this.ax = nx;
        this.ay = ny;
      } else if (dx == -1 && !this.maze.celdas[nx][ny].paredD) {
        this.ax = nx;
        this.ay = ny;
      } else if (dy == 1 && !this.maze.celdas[this.x][this.y].paredB) {
        this.ax = nx;
        this.ay = ny;
      } else if (dy == -1 && !this.maze.celdas[nx][ny].paredB) {
        this.ax = nx;
        this.ay = ny;
      }
    }
  }
  
  desplaza() {
    if (this.x < this.ax) {
      this.x++;
    } else if (this.x > this.ax) {
      this.x--;
    } else if (this.y < this.ay) {
      this.y++;
    } else if (this.y > this.ay) {
      this.y--;
    }
  }
}