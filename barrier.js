class Barrier extends Player {
  constructor(game, x) {
    super(game, x);
    this.y = Math.random() * 400;
    this.x = Math.random() * 600;
    this.height = Math.random() * 50 + 30;
  }
  disappear() {
    const index = this.game.barriers.indexOf(this);
    this.game.barriers.splice(index, 1);
  }
}
