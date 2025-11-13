let imagenFondo
let imagenInicio
let personaje
let posY = 100
let posX = 100
let dY = 3
let x = 0
let estado = 0 // 0 = inicio; 1 = jugar

function preload() {
  // put preload code here
  imagenFondo = loadImage("./images/fondojuego00.png")
  imagenInicio = loadImage("./images/fondoinicio00.png")
  personaje = loadImage("./images/peepo.webp")
}

function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight)
  noCursor()
}

function draw() {
  // put drawing code here
  if (estado === 1) {
    background(255)
    image(imagenFondo,x,0)
    image(imagenFondo,x+imagenFondo.width,0)
    x = x - 5
    dY = dY + 1
    posY = posY + dY
    if (x <= -imagenFondo.width) {
      x = 0
    }
  } else if (estado === 0) {
    background(0)
    cursor()
    fill(255) 
    textSize(24)
    image(imagenInicio,0,0,450,600) 
    text("Clic para jugar",600, 200)
  }
  
  image(personaje,posX,posY,60,60)
}

function mousePressed() {
  if (estado == 0) {
    estado = 1
    posX = 100
    posy = 100
    dY = 3
    x = 0
  }
  dY = -15
}