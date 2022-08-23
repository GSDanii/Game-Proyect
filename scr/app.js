let game = {
    ctx: undefined,
    obstacles: [],
    score: 0,
    canvasSize : {
        w: 900,
        y: 900
    },
    fps: 60,
    framesCounter: 0,
    cooldown: 40,
    proyectiles: [],
    canShoot: false,


    init(canvasId){
       this.ctx = document.querySelector(canvasId).getContext('2d'),
        this.setEventListeners(),
        this.createShip(),
        this.drawAll(),
        this.drawSpace()
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

    drawSpace(){
        const space = new Image()
        space.src = '../img/space3.jpg'
        this.ctx.drawImage(space, 0, 0, this.canvasSize.w, this.canvasSize.y)
    
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

    colisionProyectil(){
        this.obstacles.forEach((obs, i) => {
            this.proyectiles.forEach((pro, j) => {
                if(this.proyectiles.length > 0) {
                if(pro.proyecPos.y < obs.obstaclePos.y + 100 
            && pro.proyecPos.x + 50 > obs.obstaclePos.x 
            && pro.proyecPos.x < obs.obstaclePos.x + 100 ) {
            this.obstacles.splice(i, 1)
            this.proyectiles.splice(j, 1)
            }            
        }
    })        
    })
    },


c
    
}

