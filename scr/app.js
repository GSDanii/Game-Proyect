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
            console.log(e.keyCode)
            switch(e.keyCode){
                case 37:
                this.ship.moveLeft();
                break;  
                case 38:
                this.ship.moveUp();
                break;
                case 39:
                this.ship.moveRight();
                break;
                case 40:
                this.ship.moveDown();
                break;
                case 32:
                this.ship.shoot();
                break;
            }
})
    },

    drawSpace(){
        const space = new Image()
        space.src = '../img/espacio 2.jpeg'
        this.ctx.drawImage(space, 0, 0, this.canvasSize.w, this.canvasSize.y)
        if(0 < this.canvasSize.w) {

        }
    },

    createShip(){
        this.ship = new SpaceShip(this.ctx, 350, 800, 90, 100)
    },

    clearAll(){
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.y)
    },

    drawAll(){
       this.interval = setInterval(() =>{

            // this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.score++
            this.clearAll()
            this.drawSpace()
            this.ship.draw()
            // this.obstacles.forEach(elm => elm.draw())
            // if(this.framesCounter % 50 === 0){
            //     this.generateObstacles()
            // }

        }, 50)
    },

//    generateObstacles() {
//         this.obstacles.push(
//             new Obstacles(this.ctx, Math.floor(Math.random()*300), 0, 200, 10, 10, 'red')
//         )
//     }        
    
}

