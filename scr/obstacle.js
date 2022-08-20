class Obstacles {
    constructor (ctx, posX, posY, width, height, speed,) {
        this.ctx = ctx
        this.speed = speed
        this.obstaclePos = { x: posX, y: posY }
        this.obstacleSize = { w: width, h: height }
        
        this.init()
    }
    init() {
        this.obsImg = new Image()
        this.obsImg.src = '../img/NAVES-04.png'
        
    }

    draw() {
        this.move();
        this.ctx.drawImage(this.obsImg,this.obstaclePos.x,this.obstaclePos.y, this.obstacleSize.w,this.obstacleSize.h)
        // this.ctx.fillStyle = this.color
        // this.ctx.fillRect(this.obstaclePos.x, this.obstaclePos.y, this.obstacleSize.w, this.obstacleSize.h);
    }

    move() {

        this.obstaclePos.y += this.speed
    }
    deleteObstacle() {
        this.obstaclePos.slice()                        
    }

}