class Proyectil {
  constructor(ctx, posX, posY, width, height, speed) {
    this.ctx = ctx
    this.speed = speed
    this.proyecPos = { x: posX + 25, y: posY - 29 }
    this.proyecSize = { w: width, h: height }
    this.init()

  }

  init(){
    this.proyecImg = new Image()
    this.proyecImg.src = '../img/Blaster Shoot-01.png'
  }

  draw() {
      this.move()
      this.ctx.drawImage(this.proyecImg,this.proyecPos.x,this.proyecPos.y, this.proyecSize.w,this.proyecSize.h)
  }

  move() {
    this.proyecPos.y -= this.speed
  }
}