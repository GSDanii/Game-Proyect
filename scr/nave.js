class SpaceShip{
    constructor(ctx, posX, posY, shipWidth, shipHeight, img){
        this.ctx = ctx
        this.shipPos = { x: posX, y: posY}
        this.shipSize = { w: shipWidth, h: shipHeight}
        this.img
        this.canvasSize={
        w: 500,
        h: 700
        }
        this.init()
    }
    init(){
        this.shipImg = new Image()
        this.shipImg.src = `../img/spaceShip.png`
    }

    draw(){
       this.ctx.drawImage(this.shipImg,this.shipPos.x,this.shipPos.y, this.shipSize.w,this.shipSize.h)
    }

    moveLeft(){
       if(0 < this.shipPos.x){
            this.shipPos.x -=20
        }
        }
    

    moveRight(){
        if(this.shipPos.x < 600)
            this.shipPos.x += 20
    }

    moveUp(){
        if(0 < this.shipPos.y){
            this.shipPos.y -= 20
        }
    }

    moveDown(){
        if(this.shipPos.y < 800){
            this.shipPos.y += 20
        }
    }
}