class Ground{
    constructor(x, y, w, h){
        this.body = Bodies.rectangle(x, y, w, h, {isStatic:true})
        World.add(world,this.body)
        
        this.x = x
        this.y = y
        this.h = h
        this.w = w

    }

    display(){
        push()
        rectMode(CENTER)
        fill("black")
        rect(this.x, this.y, this.w, this.h)
        pop()
    }

}