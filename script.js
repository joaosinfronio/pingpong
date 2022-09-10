const startScreenElement = document.querySelector("#start");
const gameScreenElement = document.querySelector("#game");
const gameOverScreenElement = document.querySelector("#game-over");

const startButton2Players = startScreenElement.querySelector("#twoPlayers");
const startButtonComputer = startScreenElement.querySelector("#computer");

const playAgainButton = gameOverScreenElement.querySelector("button");
const game = new Game(gameScreenElement, gameOverScreenElement);

function endGame(game) {
  if (game.lose()) {
    gameScreenElement.style.display = "none";
    gameOverScreenElement.style.display = "";
  }
}

startButton2Players.addEventListener("click", () => {
  game.start("twoPlayer");

  startScreenElement.style.display = "none";
  gameScreenElement.style.display = "";
});

startButtonComputer.addEventListener("click", () => {
  game.start("computer");
  startScreenElement.style.display = "none";
  gameScreenElement.style.display = "";
});

playAgainButton.addEventListener("click", () => {
  gameOverScreenElement.style.display = "none";
  startScreenElement.style.display = "";
});
