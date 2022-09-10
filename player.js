class Player {
  constructor(game, x) {
    this.game = game;
    this.x = x;
    this.y = 200;
    this.width = 10;
    this.height = 70;
    this.score = 10;
    this.speed = 10;
  }

  draw() {
    this.game.context.fillStyle = "grey";
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
