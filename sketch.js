let imagenFondo
let imagenInicio
let personaje
let pared
let posY = 100
let posX = 100
let dY = 3
let x = 0
let estado = 0 // 0 = inicio; 1 = jugar
let wallX = []
let wallY = []
let musicaRecord
let musicaFondo
let puntuacion = 0
let mejorPuntuacion = 0
let recordAnterior = 0
let sonido = true

function preload() {
  // put preload code here
  imagenFondo = loadImage("./images/fondojuego00.png")
  imagenInicio = loadImage("./images/fondoinicio00.jpg")
  personaje = loadImage("./images/miku00.gif")
  pared = loadImage("./images/pared.png")
  musicaRecord = loadSound("./sounds/aplauso.wav")
  musicaFondo = loadSound("./sounds/musicafondo.mp3")
}

function setup() {
  // put setup code here
  createCanvas(1000,512)
  noCursor()
}

function draw() {
  // put drawing code here
  if (estado === 1) {
    background(255)
    imageMode(CORNER)
    image(imagenFondo,x,0)
    image(imagenFondo,x+imagenFondo.width,0)
    x = x - 5
    dY = dY + 1
    posY = posY + dY
    if (x <= -imagenFondo.width) {
      x = 0
    }
    //obstáculos
    for (let i=0; i < wallX.length; i++) {
      imageMode(CENTER)
      image(pared,wallX[i],wallY[i]-500)
      image(pared,wallX[i],wallY[i]+500)

      if (wallX[i] < -pared.width) {
        wallX[i] = width + 80
        wallY[i] = random(200,300)
      }
      //Puntaje
      if (wallX[i] === posX) {
        puntuacion = puntuacion + 1
        mejorPuntuacion = max(mejorPuntuacion,puntuacion)
      }

      wallX[i] = wallX[i] - 5

      //colisiones
      if (posY <-60 || posY > height ||
         (abs(wallX[i]-posX) < 60 && abs(wallY[i]-posY) > 100)) {
        musicaFondo.stop()
        estado = 0
      }
    }

    image(personaje,posX,posY,60,60)
    text("Puntaje: " + puntuacion,width/2-60,30)

  } else if (estado === 0) {
    background(0)
    imageMode(CORNER)
    cursor()
    fill(255) 
    textSize(24)
    image(imagenInicio,0,0,450,600) 
    text("Puntaje Máximo: " + mejorPuntuacion,600, 100)
    text("Clic para jugar",600, 200)
    if (mejorPuntuacion > recordAnterior) {
      if (!musicaRecord.isPlaying() && sonido) {
        musicaRecord.play(duration = 2)
        sonido = false
      }
    }
  }
  
  
}

function mousePressed() {
  if (estado == 0) {
    estado = 1
    posX = 100
    posY = 100
    dY = 3
    x = 0
    puntuacion = 0
    recordAnterior = mejorPuntuacion
    sonido = true
    noCursor()
    wallX = [1100, 1400, 1700]
    wallY[0] = random(200,300)
    wallY[1] = random(200,300)
    wallY[2] = random(200,300)
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    musicaFondo.loop()
  }
  dY = -15
}