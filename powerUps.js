class PowerUP extends Barrier {
  constructor(game, x, name) {
    super(game, x);
    this.name = name;
    this.image = new Image();
    this.width = 32;
    this.height = this.width;
  }

  draw() {
    // this.game.context.beginPath();
    // this.game.context.arc(this.x, this.y, this.width, 0, Math.PI * 2, false);
    switch (this.name) {
      case "speed":
        this.image.src = "/images/speed.png";

        break;
      case "slow":
        this.image.src = "/images/slow.png";

        break;
      case "splitBall":
        this.image.src = "/images/split.png";

        break;
    }
    this.game.context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
    // this.game.context.fill();
    // this.game.context.closePath();
  }
}
