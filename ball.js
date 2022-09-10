class Ball {
  constructor(game) {
    this.game = game;
    this.x = 350;
    this.y = 250;
    this.radius = 7;
    this.speed = 3;
    this.directionX = -1;
    this.directionY = 1;
  }

  checkForBorder() {
    return this.y > 500 || this.y < 0;
  }

  //   checkForPlayer() {
  //     return (
  //       this.x - this.radius < this.game.player.x + this.game.player.width ||
  //       this.x + this.radius > this.game.player2.x - this.game.player2.width
  //     );
  //   }
  checkForYintesection(item) {
    return (
      this.y + this.radius >= item.y &&
      this.y - this.radius <= item.y + item.height
    );
  }
  checkForColision(item) {
    return (
      this.x - this.radius <= item.x + item.width &&
      this.checkForYintesection(item) &&
      this.x + this.radius >= item.x &&
      this.checkForYintesection(item)
    );
  }

  draw() {
    this.game.context.beginPath();
    this.game.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.game.context.fillStyle = "black";
    this.game.context.fill();
    this.game.context.closePath();
  }

  directionLogic(item) {
    if (this.checkForColision(item)) {
      if (item instanceof Barrier) {
        item.disappear();
        switch (item.name) {
          case "speed":
            this.speed *= 1.2;
            break;
          case "slow":
            this.speed *= 0.9;
            break;
          case "splitBall":
            const ball = new TempBall(this.game);
            ball.x = this.x;
            ball.y = this.y;
            this.game.tempBalls.push(ball);
            break;
        }
      }
      this.directionX = -this.directionX;
      if (this.y - this.radius < item.y) {
        this.y = item.y - this.radius * 1.3;
        this.directionY = -this.directionY;
      }
      if (this.y + this.radius > item.y + item.height) {
        this.y = item.y + item.height + this.radius * 1.3;
        this.directionY = -this.directionY;
      }
    }
  }

  reset() {
    this.x = 350;
    this.y = 250;
    this.speed = 2;
  }

  runLogic() {
    if (this.checkForBorder()) {
      this.directionY = -this.directionY;
    }
    this.y = this.y + this.speed * this.directionY;

    this.directionLogic(this.game.player);
    for (let adversary of this.game.adversaries) {
      this.directionLogic(adversary);
    }
    for (let barrier of this.game.barriers) {
      this.directionLogic(barrier);
    }

    this.x = this.x + this.speed * this.directionX;

    if (this.x < 0) {
      this.game.player.score--;
      this.reset();
    }
    if (this.x > 700) {
      for (let adversary of this.game.adversaries) {
        adversary.score--;
      }
      this.reset();
    }
  }
}
