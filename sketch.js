const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;


function preload(){

  rabbit = loadAnimation("Rabbit-01.png")
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")
  eat.looping = false
  sad.looping = false
  bg = loadImage("background.png")
  scissors = loadImage("cut_btn.png")
  melon = loadImage("melon.png")
  gStar = loadAnimation("g_star1.png")
  star = loadAnimation("star.png")

  bgMusic = loadSound("sound1.mp3")
  sadSound = loadSound("sad.wav")
  cutSound = loadSound("rope_cut.mp3")
  eatSound = loadSound("eating_sound.mp3")
  airSound = loadSound("air.wav")


}





function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile){
    w = displayWidth
    h = displayHeight
    createCanvas(w,h)
  }else{
    w = windowWidth 
    h = windowHeight 
    createCanvas(w-20,h-20)
  }

  engine = Engine.create();
  world = engine.world;
  bgMusic.loop()
  bgMusic.play()
  bgMusic.setVolume(0.1)

  blink.frameDelay = 7
  eat.frameDelay = 7
  sad.frameDelay = 7
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  ground = new Ground(w/2,h-10,w,20)
  rope = new Rope(9,{x:w/2 +30, y:h/7})
  rope2 = new Rope(6,{x:w/2+200 +30, y:h/3})
  rope3 = new Rope(6,{x:w/2-250 +30, y:h/2})
  fruit = Bodies.circle(w/2,h/2,40)
  Composite.add(rope.body, fruit)
  link = new Link(rope, fruit)
  link2 = new Link(rope2, fruit)
  link3 = new Link(rope3, fruit)

  bunny = createSprite(w/2,h-200)
  bunny.addAnimation("blink", blink)
  bunny.addAnimation("eat", eat)
  bunny.addAnimation("sad", sad)
  bunny.scale=0.4

  cutButton1 = createImg("cut_btn.png")
  cutButton1.position(w/2,h/7)
  cutButton1.size(75,75)
  cutButton1.mouseClicked(drop1)

  cutButton2 = createImg("cut_btn.png")
  cutButton2.position(w/2 + 200,h/3)
  cutButton2.size(75,75)
  cutButton2.mouseClicked(drop2)

  cutButton3 = createImg("cut_btn.png")
  cutButton3.position(w/2 - 250,h/2)
  cutButton3.size(75,75)
  cutButton3.mouseClicked(drop3)

  balloon = createImg("balloon.png")
  balloon.position(w/4,h/2)
  balloon.size(150,100)
  balloon.mouseClicked(blow)

  muteButton = createImg("mute.png")
  muteButton.position(w-150,30)
  muteButton.size(50,50)
  muteButton.mouseClicked(mute)

  star1 = createSprite(w/2 +300, h/2)
  star1.addAnimation("Yellow", star)
  star1.scale = 0.03

  star2 = createSprite(w/2 , h/2 + 100)
  star2.addAnimation("Yellow", star)
  star2.scale = 0.03

  greyStar1 = createSprite(100, 100)
  greyStar1.addAnimation("Grey", gStar)
  greyStar1.scale = 0.1
  
  greyStar2 = createSprite(200, 100)
  greyStar2.addAnimation("Grey", gStar)
  greyStar2.scale = 0.1

  greyStar1.addAnimation("yellow", star)
  greyStar2.addAnimation("yellow", star)
}



function draw() 
{
  background(bg);
  Engine.update(engine);
  ground.display()
  rope.show()
  rope2.show()
  rope3.show()

  if(collision(fruit, bunny, 80)){
    World.remove(world,fruit)
    fruit = null
    bunny.changeAnimation("eat")
    eatSound.play()
  }
  if(fruit !=null && fruit.position.y>h-50){
    bunny.changeAnimation("sad")
    World.remove(world, fruit)
    fruit = null
    bgMusic.stop()
    sadSound.play()
    
  }
   
  if(collision(fruit, star1, 20)){
    star1.visible = false
    greyStar1.changeAnimation("yellow")
    greyStar1.scale = 0.03
  }

  if(collision(fruit, star2, 20)){
    star2.visible = false
    greyStar2.changeAnimation("yellow")
    greyStar2.scale = 0.03
  }

  imageMode(CENTER)
  if(fruit != null){
  image(melon,fruit.position.x, fruit.position.y, 120, 120)
  }
  drawSprites()
}


function drop1(){
  rope.break()
  link.break()
  cutSound.play()
}

function drop2(){
  rope2.break()
  link2.break()
  cutSound.play()
}

function drop3(){
  rope3.break()
  link3.break()
  cutSound.play()
}

function collision(bodyA, bodyB, dD){
  if(bodyA != null){
    var d = dist(bodyA.position.x, bodyA.position.y, bodyB.position.x, bodyB.position.y)
    if(d<=dD){
      return true
    }else{
      return false
    }
  }
}

function blow(){
  Matter.Body.applyForce(fruit,{x:0,y:0}, {x:0.03, y:0})
  airSound.setVolume(0.25)
  airSound.play()
}
function mute(){
if(bgMusic.isPlaying()){
  bgMusic.stop()
}else{
  bgMusic.loop()
  bgMusic.play()
}

}