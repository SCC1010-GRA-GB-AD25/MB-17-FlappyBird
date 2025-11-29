let imagenFondo
let imagenInicio
let imagenFlappyInicio
let personaje
let pared
let posY = 100
let posX = 100
let dY = 3
let x = 0
let estado = 0 // 0 = inicio; 1 = jugar
let wallX = []
let wallY = []
let wallPassed = []
let musicaRecord
let musicaFondo
let puntuacion = 0
let mejorPuntuacion = 0
let recordAnterior = 0
let sonido = true
let muerte
let fuente


function preload() {
  // put preload code here
  imagenFondo = loadImage("./images/fondo.png")
  imagenInicio = loadImage("./images/fondo.png")
  imagenFlappyInicio = loadImage("./images/flappy-dash.png")
  personaje = loadImage("./images/ufored.png")
  pared = loadImage("./images/Pinchos.png")
  musicaRecord = loadSound("./sounds/magicExplosion.ogg")
  musicaFondo = loadSound("./sounds/musicafondogd.mp3")
  muerte = loadSound("./sounds/sonidoMuerte.mp3")
  fuente = loadFont("./fonts/fuente.otf")
}

function setup() {
  // put setup code here
  createCanvas(1366,640)
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
        wallY[i] = random(200,500)
        wallPassed[i] = false
      }
      //Puntaje
      if (!wallPassed[i] && wallX[i] < posX) {
        puntuacion = puntuacion + 1
        mejorPuntuacion = max(mejorPuntuacion,puntuacion)
        wallPassed[i] = true
      }

      wallX[i] = wallX[i] - 5

      //colisiones
      if (posY <-60 || posY > height ||
         (abs(wallX[i]-posX) < 60 && abs(wallY[i]-posY) > 70)) {
        musicaFondo.stop()
        muerte.play()
        estado = 0
      }
    }

    image(personaje,posX,posY,70,60)
    text("Puntaje: " + puntuacion,width/2-60,30)

  } else if (estado === 0) {
    background(0)
    imageMode(CORNER)
    cursor()
    fill(255) 
    textSize(24)
    image(imagenInicio,0,0,1366,640)
    imageMode(CENTER)
    image(imagenFlappyInicio,width/2,height/2,1000,590)
    textFont(fuente)
    fill(254,207,15)
    text("Puntaje Máximo: " + mejorPuntuacion,560, 500)
    
    if (mejorPuntuacion > recordAnterior) {
      if (!musicaRecord.isPlaying() && sonido) {
        musicaRecord.play(duration = 0.1)
        sonido = false
      }
    }
  }
  
  
}

function mousePressed()  {
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
    wallX = [1100, 1600, 2100]
    wallY[0] = random(200,300)
    wallY[1] = random(200,300)
    wallY[2] = random(200,300)
    wallPassed = [false, false, false]
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    musicaFondo.loop()
  }
  dY = -15
}