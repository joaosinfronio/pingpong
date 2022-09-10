class Computer extends Player {
  constructor(game, x) {
    super(game, x);
    this.speed = this.game.ball.speed;
    this.direction = 1;
    this.height = 70;
  }

  checkForBallOut() {
    return this.y < this.game.ball.y && this.y + this.height > this.game.ball.y;
  }

  checkForBall() {
    if (this.y + this.height / 2 !== this.game.ball.y) {
      let dir =
        (this.y + this.height / 2 - this.game.ball.y) /
        Math.abs(this.y + this.height / 2 - this.game.ball.y);
      this.direction = -dir;
    }
  }

  runLogic() {
    this.speed = this.game.ball.speed * 0.987;

    if (this.game.gameFrame % 11 === 0) {
      this.checkForBall();
    }
    if (this.y < 1) {
      this.direction = 1;
    }
    if (this.y + this.height >= 499) {
      this.direction = -1;
    }
    if (!this.checkForBallOut()) {
      this.y = this.y + this.speed * this.direction;
    }
  }
}
