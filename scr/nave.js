class SpaceShip{
    constructor(ctx, posX, posY, shipWidth, shipHeight,){
        this.ctx = ctx
        this.shipPos = { x: posX, y: posY}
        this.shipSize = { w: shipWidth, h: shipHeight}
        this.img
        this.canvasSize={
        w: 500,
        h: 700
        }
        this.init()
        this.keys = {
            keysLeftPress: false,
            keysRightPress: false,
            keysUpPress: false,
            keysDownPress: false
        }
        this.proyectiles = []
    }
    init(){
        this.shipImg = new Image()
        this.shipImg.src = '../img/NAVES-01.png'
    }

    draw(){
       this.ctx.drawImage(this.shipImg,this.shipPos.x,this.shipPos.y, this.shipSize.w,this.shipSize.h)
       this.proyectiles.forEach(proyec => proyec.draw())
    }

    moveLeft(){
       if(0 < this.shipPos.x){
            this.shipPos.x -=20
        }
        }
    

    moveRight(){
        if(this.shipPos.x < 800)
            this.shipPos.x += 20
    }

    moveUp(){
        if(0 < this.shipPos.y){
            this.shipPos.y -= 20
        }
    }

    moveDown(){
        if(this.shipPos.y < 750){
            this.shipPos.y += 20
        }
    }

                           


}