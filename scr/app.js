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
    proyectiles: [],


    init(canvasId){
       this.ctx = document.querySelector(canvasId).getContext('2d'),
        this.setEventListeners(),
        this.createShip(),
        this.drawAll(),
        this.drawSpace()
    },

    // MOVIMIENTO DE LA NAVE Y DISPARO

    setEventListeners(){
        window.addEventListener('keydown', e => {
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
            }
})
        window.addEventListener('keyup', e => {
           
            switch(e.keyCode){
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

        }, 60)
    },

     //GENERADOR DE OBSTACULOS

   generateObstacles() {
        this.obstacles.push(
            new Obstacles(this.ctx, Math.floor(Math.random()*750), 0, 100, 100, 5,)
        )
    },

     //GENERADOR DE DISPAROS

    shoot() {
    this.proyectiles.push(
        new Proyectil(this.ctx, this.ship.shipPos.x, this.ship.shipPos.y, 50, 100, 9));
  }              
    
    
}

