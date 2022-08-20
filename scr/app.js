let game = {
    ctx: undefined,
    obstacles: [],
    score: 0,
    canvasSize : {
        w: 700,
        y: 900
    },
    fps: 60,
    framesCounter: 0,


    init(canvasId){
       this.ctx = document.querySelector(canvasId).getContext('2d'),
    //    this.ctx.strokeStyle = 'red',
    //    this.ctx.strokeRect(0, 0, 700, 900),
        this.setEventListeners(),
        this.createShip(),
        this.drawAll(),
        this.drawSpace()
    },

    setEventListeners(){
        window.addEventListener('keydown', e => {
            
            switch(e.keyCode){
                case 37:
                this.ship.keys.keysLeftPress = true;
                break;  
                case 38:
                 this.ship.keys.keysUpPress = true;
                break;
                case 39:
                this.ship.keys.keysRightPress = true;
                break;
                case 40:
                this.ship.keys.keysDownPress = true;
                break;
                case 32:
                this.ship.shoot();
                break;
            }
})
        window.addEventListener('keyup', e => {
           
            switch(e.keyCode){
                case 37:
                this.ship.keys.keysLeftPress = false;
                break;  
                case 38:
                 this.ship.keys.keysUpPress = false;
                break;
                case 39:
                this.ship.keys.keysRightPress = false;
                break;
                case 40:
                this.ship.keys.keysDownPress = false;
                break;
                case 32:
                this.ship.shoot();
                break;
            }
})
    },

//     setEventListeners(){
//         window.addEventListener('keyup', e => {
           
//             switch(e.keyCode){
//                 case 37:
//                     console.log('KeyUp')
//                 this.ship.keys.keysLeftPress = false;
//                 break;  
//                 case 38:
//                  this.ship.keys.keyUpPress = false;
//                 break;
//                 case 39:
//                 this.ship.keys.keyRightPress = false;
//                 break;
//                 case 40:
//                 this.ship.keys.keyDownPress = false;
//                 break;
//                 case 32:
//                 this.ship.shoot();
//                 break;
//             }
// })
//     },

    

    drawSpace(){
        const space = new Image()
        space.src = '../img/espacio 2.jpeg'
        this.ctx.drawImage(space, 0, 0, this.canvasSize.w, this.canvasSize.y)
        if(0 < this.canvasSize.w) {

        }
    },

    createShip(){
        this.ship = new SpaceShip(this.ctx, 350, 800, 100, 150)
    },

    clearAll(){
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.y)
    },

    drawAll(){
       this.interval = setInterval(() =>{

            this.framesCounter++
            this.score++
            this.clearAll()
            console.log(this.ship.keys)
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
            if(this.framesCounter % 50 === 0){
                this.generateObstacles()
            }

        }, 60)
    },

   generateObstacles() {
        this.obstacles.push(
            new Obstacles(this.ctx, Math.floor(Math.random()*600), 0, 100, 100, 5,)
        )
    }        
    
}

