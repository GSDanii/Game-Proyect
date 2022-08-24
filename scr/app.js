let game = {
    ctx: undefined,
    obstacles: [],
    score: 0,
    canvasSize : {
        w: 900,
        y: 900
    },
    fps: 60,
    canStart: true,
    framesCounter: 0,
    cooldown: 40,
    proyectiles: [],
    canShoot: false,
    lives: 3,
    goImg: undefined,
    space: undefined,
    overFont: undefined,
    posX: 0,
    posY: 0,
    enemies: 30,
    quitarVida2 : false,
    quitarVida1 : false,
    quitarVida: false,


    init(canvasId){
        
        this.canvas = document.querySelector(canvasId)
        this.ctx = this.canvas.getContext('2d')
        
        this.canvas.style.border = "solid  2px blue"
            
        this.overFont = new Image()
        this.overFont.src = '../img/prueba3.png'
        this.space = new Image()
        this.space.src = '../img/bg.png'
        this.setEventListeners(),
        this.createShip(),
        this.drawAll(),
        this.drawSpace(),
        this.goImg = new Image()
        this.goImg.src = '../img/gameover.png'
        
    },

    // MOVIMIENTO DE LA NAVE Y DISPARO

    setEventListeners(){
        window.addEventListener('keydown', (e) => {
            switch(e.keyCode){
                case 65:
                this.ship.keys.keysLeftPress = true;
                break;  
                case 87:
                 this.ship.keys.keysUpPress = true;
                break;
                case 68:
                this.ship.keys.keysRightPress = true;
                break;
                case 83:
                this.ship.keys.keysDownPress = true;
                break;
                case 96:
                this.shoot();
                break;
                case 32:
                case 13:
                e.preventDefault();
                this.shoot()
                break;
            }
})
        window.addEventListener('keyup', ({keyCode}) => {
           
            switch(keyCode){
                case 65:
                this.ship.keys.keysLeftPress = false;
                break;  
                case 87:
                 this.ship.keys.keysUpPress = false;
                break;
                case 68:
                this.ship.keys.keysRightPress = false;
                break;
                case 83:
                this.ship.keys.keysDownPress = false;
                break;
                
            }
})
    },

    //GENERADOR DEL FONDO

    drawGameOver(){
        this.ctx.drawImage(this.goImg,0 , 0, 900,900)
        
    },

    drawFont() {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect = (1, 1, 800, 800);
    },

    drawSpace(){
        this.ctx.drawImage(this.space, this.posX, this.posY, this.canvasSize.w, this.canvasSize.y)
        this.ctx.drawImage(this.space, this.posX, this.posY - this.canvasSize.y, this.canvasSize.w, this.canvasSize.y)
        this.spaceMove()
    },
    spaceMove(){
      if (this.posY >= + this.canvasSize.y) {
      this.posY = 0;
    }
    this.posY += 10;
  },

    //GENERADOR DE LA NAVE

    createShip(){
        this.ship = new SpaceShip(this.ctx, 350, 750, 100, 150)
    },

    clearAll(){
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.y)
    },

    // SET INTERVAL PARA QUE PINTE LOS ELEMENTOS DEL JUEGO

    drawAll(){

       this.interval = setInterval(() =>{

            this.framesCounter++
            this.cooldown++
            this.score++
            this.clearAll()
            if(this.ship.keys.keysLeftPress){
                this.ship.moveLeft()
            }
            if(this.ship.keys.keysRightPress){
                this.ship.moveRight()
            }
            if(this.ship.keys.keysUpPress){
                this.ship.moveUp()
            }
            if(this.ship.keys.keysDownPress){
                this.ship.moveDown()
           }

           this.drawSpace()
           this.ship.draw()
           this.drawFont()
            this.obstacles.forEach(elm => elm.draw())
            this.proyectiles.forEach(elm => elm.draw())
            if(this.framesCounter % 50 === 0){
                this.generateObstacles()        
            }
            if(this.cooldown >= 16) {
                this.canShoot = true
            }
            else {
                this.canShoot = false
            }
            this.deleteItems()
            this.colisionProyectil()
            this.colisionShip()
            this.removeHearts()
            this.enemiesDestroyed()
            

        }, 1000 / this.fps)
    },

     //GENERADOR DE OBSTACULOS

   generateObstacles() {
        const min = 4.5;
        const max = 5.5;
        this.obstacles.push(
            new Obstacle(this.ctx, Math.floor(Math.random()*750), 0, 100, 100, (Math.random()*(max -min+1)+min))
        )

    },

     //GENERADOR DE DISPAROS

    shoot() {
        if(this.canShoot) {
            this.proyectiles.push(new Proyectil(this.ctx, this.ship.shipPos.x, this.ship.shipPos.y, 50, 100, 12));
            this.cooldown = 0
        }
  },
  
  deleteItems() {
    this.obstacles = this.obstacles.filter(obstacle => obstacle.obstaclePos.y <= this.canvasSize.y)
    this.proyectiles = this.proyectiles.filter(proyectil => proyectil.proyecPos.y >= 0)
    },
    
    //COLISIONS

    colisionProyectil(){
        this.obstacles.forEach((obs, i) => {
            this.proyectiles.forEach((pro, j) => {
                if(this.proyectiles.length > 0) {
                if(pro.proyecPos.y < obs.obstaclePos.y + 100 
            && pro.proyecPos.x + 50 > obs.obstaclePos.x 
            && pro.proyecPos.x < obs.obstaclePos.x + 100 ) {
            this.obstacles.splice(i, 1)
            this.proyectiles.splice(j, 1)
            this.enemies--
            if(this.enemies === 0){
                this.winGame()
            }
            }            
        }
    })        
    })
    },


    colisionShip(){
        this.obstacles.forEach((obs, i) => {
            if(this.ship.shipPos.y < obs.obstaclePos.y + 100
            && this.ship.shipPos.y +100 > obs.obstaclePos.y
            && this.ship.shipPos.x +100 > obs.obstaclePos.x 
                && this.ship.shipPos.x < obs.obstaclePos.x + 100) {
                this.obstacles.splice(i, 1)
                this.lives--
                if(this.lives === 0){
                    this.lostGame()
                }
            }
        })
    },

    // WIN/LOST CONDITION

    lostGame(){
        clearInterval(this.interval)
        this.clearAll()
        this.drawGameOver()
        this.canStart = true
    },

    winGame(){
        
    },

    //DOM

    removeHearts(){
        const hearts = document.querySelector('#prueba')
        const heart1 = document.querySelector("#h1")
        const heart2 = document.querySelector("#h2")
        const heart3 = document.querySelector("#h3")
            if(this.lives === 2 && !this.quitarVida2){ //&& !quitarVida2
                hearts.removeChild(heart3)
                this.quitarVida2 = true
            }else if(this.lives === 1 && !this.quitarVida1){
                hearts.removeChild(heart2)
                this.quitarVida1 = true;
            }else if(this.lives === 0 && !this.quitarVida){
                hearts.removeChild(heart1)
                this.quitarVida = true
            }   
    },

    enemiesDestroyed(){
        const score = document.querySelector('#score')
        score.innerHTML = this.enemies + ''
        // score.innerHTML = 'Valentin'
        
    }


}

