class Game {
  constructor(gameScreenElement, gameOverScreenElement) {
    this.gameScreenElement = gameScreenElement;
    this.gameOverScreenElement = gameOverScreenElement;
    this.canvasElement = document.querySelector("canvas");

    this.context = this.canvasElement.getContext("2d");

    this.backgroundImage = new Image();
    this.backgroundImage.src = "/images/background.png";

    this.reset();
    this.enableControls();
  }

  reset() {
    this.gameFrame = 0;
    this.ball = new Ball(this);
    this.player = new Player(this, 5);
    this.player2 = new Player(this, 670);

    this.computer = new Computer(this, 670);
    this.computer2 = new Computer(this, 630);

    this.computer2.direction = -this.computer.direction;
    this.adversaries = [];

    this.tempBalls = [];
    this.powerUps = [];

    this.barriers = [];

    this.keys = [];

    this.type = "";
  }

  enableControls() {
    const keysPressed = (event) => {
      this.keys[event.code] = true;

      if (this.keys["ArrowUp"]) {
        if (this.player.y > 0) {
          this.player.y -= this.player.speed;
        }
      }
      if (this.keys["ArrowDown"]) {
        if (this.player.y + this.player.height < 500) {
          this.player.y += this.player.speed;
        }
      }

      // case "ArrowLeft":
      //   this.player.x -= 25;
      //   break;
      // case "ArrowRight":
      //   this.player.x += 25;
      //   break;
      if (this.keys["KeyW"]) {
        if (this.player2.y > 0) {
          this.player2.y -= this.player.speed;
        }
      }
      if (this.keys["KeyS"]) {
        if (this.player2.y + this.player2.height < 500) {
          this.player2.y += this.player.speed;
        }
      }
      // case "KeyA":
      //   this.player2.x -= 25;
      //   break;
      // case "KeyD":
      //   this.player2.x += 25;
      //   break;
      event.preventDefault();
    };

    const keysReleased = (event) => {
      this.keys[event.code] = false;
    };

    const mouseMoveHandler = (e) => {
      var relativeY = e.clientY - this.canvasElement.offsetTop;
      if (relativeY > 0 && relativeY < 500) {
        this.player.y = relativeY;
      }
    };
    window.addEventListener("keydown", keysPressed, false);
    window.addEventListener("mousemove", mouseMoveHandler, false);

    window.addEventListener("keyup", keysReleased, false);
  }

  possiblyAddBarrier() {
    if (Math.random() < 0.003) {
      if (Math.random() < 0.25) {
        const barrier = new Barrier(this, 0);
        this.barriers.push(barrier);
      }
      if (Math.random() < 0.5) {
        const speed = new PowerUP(this, 0, "speed");
        this.barriers.push(speed);
      }
      if (Math.random() < 0.09) {
        const slow = new PowerUP(this, 0, "slow");
        this.barriers.push(slow);
      }
      if (Math.random() < 0.15) {
        const ball = new PowerUP(this, 0, "splitBall");
        this.barriers.push(ball);
      }
    }
  }

  drawScore() {
    this.context.font = "25px impact";
    this.context.fillStyle = "black";
    this.context.fillText("Player One Lives:" + this.player.score, 100, 100);
    this.context.fillText(
      "Player Two Lives:" + this.adversaries[0].score,
      500,
      100
    );

    this.context.fillStyle = "orange";
    this.context.fillText("Player One Lives:" + this.player.score, 102, 102);
    this.context.fillText(
      "Player Two Lives:" + this.adversaries[0].score,
      502,
      102
    );
  }

  draw() {
    this.context.clearRect(0, 0, 700, 500);

    this.context.drawImage(
      this.backgroundImage,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    this.player.draw();

    for (let adversary of this.adversaries) {
      adversary.draw();
    }
    this.ball.draw();

    for (let barrier of this.barriers) {
      barrier.draw();
    }

    for (let balls of this.tempBalls) {
      balls.draw();
    }
    this.drawScore();
  }

  runLogic() {
    this.ball.runLogic();
    for (let adversary of this.adversaries) {
      if (adversary instanceof Computer) {
        adversary.runLogic();
      }
      if (adversary.score === 0) {
        this.lose;
      }
    }
    for (let ball of this.tempBalls) {
      ball.runLogic();
    }

    this.possiblyAddBarrier();
    this.lose();
    this.gameFrame++;
  }

  loop() {
    this.runLogic();
    this.draw();
  }

  lose() {
    if (this.player.score === 0 || this.adversaries[0].score === 0) {
      this.gameScreenElement.style.display = "none";
      this.gameOverScreenElement.style.display = "";
      clearInterval(this.intervalId);
    }
  }

  start(type) {
    this.reset();

    this.type = type;
    if (this.type === "twoPlayer") {
      this.adversaries.push(this.player2);
    }
    if (this.type === "computer") {
      this.adversaries.push(this.computer);
      // this.adversaries.push(this.computer2);
    }
    this.intervalId = setInterval(() => {
      this.loop();
    }, 1000 / 60);
  }
}
