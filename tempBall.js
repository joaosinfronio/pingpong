class TempBall extends Ball {
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
      const index = this.game.tempBalls.indexOf(this);
      this.game.tempBalls.splice(index, 1);
    }
    if (this.x > 700) {
      for (let adversary of this.game.adversaries) {
        adversary.score--;
        const index = this.game.tempBalls.indexOf(this);
        this.game.tempBalls.splice(index, 1);
      }
    }
  }
}
