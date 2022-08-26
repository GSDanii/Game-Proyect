let game = {
  ctx: undefined,
  canvasSize: {
    w: 900,
    h: 900,
  },
  fps: 60,
  difficulty: null,
  canStart: true,
  framesCounter: 0,

  bullet: [],
  obstacles: [],

  cadence: null,
  cooldown: 40,
  canShoot: false,

  lives: 3,
  score: 0,
  enemies: 30,

  goImg: undefined,
  space: undefined,
  winImg: undefined,
  shootAudio: new Audio("../audio/laser.mp3"),
  introAudio: new Audio("../audio/street-fighter.mp3"),

  posX: 0,
  posY: 0,

  lostLive2: false,
  lostLive1: false,
  lostLive: false,

  init(diff, vShoot) {
    this.difficulty = diff;
    this.cadence = vShoot;
    this.canvas = document.querySelector("#Canvas");
    this.ctx = this.canvas.getContext("2d");
    this.introAudio.play();
    this.introAudio.loop = true;
    this.canvas.style.border = "solid 2px blue";

    this.preloadImgs();
    this.setMovement();
    this.createShip();
    this.drawAll();
    this.drawSpace();
  },

  preloadImgs() {
    this.space = new Image();
    this.space.src = "../img/bg.png";
    this.goImg = new Image();
    this.goImg.src = "../img/gameover.png";
    this.winImg = new Image();
    this.winImg.src = "../img/win.png";
  },

  setMovement() {
    window.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 65:
          this.ship.keys.left = true;
          break;
        case 87:
          this.ship.keys.up = true;
          break;
        case 68:
          this.ship.keys.right = true;
          break;
        case 83:
          this.ship.keys.down = true;
          break;
        case 96:
        case 32:
        case 13:
          e.preventDefault();
          this.shoot();
          this.shootAudio.play();
          break;
      }
    });

    window.addEventListener("keyup", ({ keyCode }) => {
      switch (keyCode) {
        case 65:
          this.ship.keys.left = false;
          break;
        case 87:
          this.ship.keys.up = false;
          break;
        case 68:
          this.ship.keys.right = false;
          break;
        case 83:
          this.ship.keys.down = false;
          break;
      }
    });
  },

  //GENERADOR DEL FONDO

  drawSpace() {
    this.ctx.drawImage(
      this.space,
      this.posX,
      this.posY,
      this.canvasSize.w,
      this.canvasSize.h
    );

    this.ctx.drawImage(
      this.space,
      this.posX,
      this.posY - this.canvasSize.h,
      this.canvasSize.w,
      this.canvasSize.h
    );

    this.moveSpace();
  },

  moveSpace() {
    if (this.posY >= +this.canvasSize.h) this.posY = 0;
    this.posY += 10;
  },

  //GENERADOR DE LA NAVE

  createShip() {
    this.ship = new SpaceShip(this.ctx, 350, 750, 100, 150);
  },

  clearAll() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  },

  // SET INTERVAL PARA QUE PINTE LOS ELEMENTOS DEL JUEGO

  drawAll() {
    this.interval = setInterval(() => {
      this.framesCounter++;
      this.cooldown++;
      this.score++;
      this.clearAll();

      if (this.ship.keys.left) this.ship.moveLeft();
      if (this.ship.keys.right) this.ship.moveRight();
      if (this.ship.keys.up) this.ship.moveUp();
      if (this.ship.keys.down) this.ship.moveDown();

      this.drawSpace();
      this.ship.draw();

      this.obstacles.forEach((obstacle) => obstacle.draw());
      this.bullet.forEach((projectile) => projectile.draw());

      if (this.framesCounter % this.difficulty === 0) this.generateObstacles();
      if (this.cooldown >= this.cadence) this.canShoot = true;
      else this.canShoot = false;

      this.deleteItems();
      this.colisionProyectil();
      this.colisionShip();
      this.removeHearts();
      this.enemiesDestroyed();
    }, 1000 / this.fps);
  },

  //GENERADOR DE OBSTACULOS

  generateObstacles() {
    const min = 4.5;
    const max = 5.5;
    this.obstacles.push(
      new Obstacle(
        this.ctx,
        Math.floor(Math.random() * 750),
        0,
        100,
        100,
        Math.random() * (max - min + 1) + min
      )
    );
  },

  //GENERADOR DE DISPAROS

  shoot() {
    if (this.canShoot) {
      this.bullet.push(
        new Proyectil(
          this.ctx,
          this.ship.shipPos.x,
          this.ship.shipPos.y,
          50,
          100,
          12
        )
      );
      this.cooldown = 0;
    }
  },

  deleteItems() {
    if (
      this.obstacles.length !== 0 &&
      this.obstacles[0].obstaclePos.y > this.canvasSize.h
    ) {
      this.lostGame();
    }
    this.bullet = this.bullet.filter((proyectil) => proyectil.proyecPos.y >= 0);
  },

  //COLISIONS

  colisionProyectil() {
    this.obstacles.forEach((obs, i) => {
      this.bullet.forEach((pro, j) => {
        if (this.bullet.length > 0) {
          if (
            pro.proyecPos.y < obs.obstaclePos.y + 100 &&
            pro.proyecPos.x + 50 > obs.obstaclePos.x &&
            pro.proyecPos.x < obs.obstaclePos.x + 100
          ) {
            this.obstacles.splice(i, 1);
            this.bullet.splice(j, 1);
            this.enemies--;
            if (this.enemies === 0) {
              this.winGame();
            }
          }
        }
      });
    });
  },

  colisionShip() {
    this.obstacles.forEach((obs, i) => {
      if (
        this.ship.shipPos.y < obs.obstaclePos.y + 100 &&
        this.ship.shipPos.y + 100 > obs.obstaclePos.y &&
        this.ship.shipPos.x + 100 > obs.obstaclePos.x &&
        this.ship.shipPos.x < obs.obstaclePos.x + 100
      ) {
        this.obstacles.splice(i, 1);
        this.lives--;
        if (this.lives === 0) {
          this.lostGame();
        }
      }
    });
  },

  // WIN/LOST CONDITION

  lostGame() {
    clearInterval(this.interval);
    this.clearAll();
    this.ctx.drawImage(this.goImg, 0, 0, this.canvasSize.w, this.canvasSize.h);
    this.introAudio.pause();
    this.obstacles = [];
    this.bullet = [];
    this.canStart = true;
    setTimeout(() => {
      location.reload();
    }, 4000);
  },

  winGame() {
    clearInterval(this.interval);
    this.clearAll();
    this.ctx.drawImage(this.winImg, 0, 0, this.canvasSize.w, this.canvasSize.h);
    this.introAudio.pause();
    this.canStart = true;
    setTimeout(() => {
      location.reload();
    }, 4000);
  },

  //DOM

  removeHearts() {
    const hearts = document.querySelector("#prueba");
    const heart1 = document.querySelector("#h1");
    const heart2 = document.querySelector("#h2");
    const heart3 = document.querySelector("#h3");
    if (this.lives === 2 && !this.lostLive2) {
      hearts.removeChild(heart3);
      this.lostLive2 = true;
    } else if (this.lives === 1 && !this.lostLive1) {
      hearts.removeChild(heart2);
      this.lostLive1 = true;
    } else if (this.lives === 0 && !this.lostLive) {
      hearts.removeChild(heart1);
      this.lostLive = true;
    }
  },

  enemiesDestroyed() {
    const score = document.querySelector("#score");
    score.innerHTML = this.enemies + "";
  },
};
