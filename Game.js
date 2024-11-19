export default class Game {
  constructor() {
    this.score = 0; // Trenutni rezultat
    this.highScore = localStorage.getItem("web2lab3-highScore") || 0; // Najbolji rezultat
    this.isFinished = false;
    this.finishedText = null;
  }

  addScore(points) {
    this.score += points; // Dodaj bodove trenutnom rezultatu
  }

  setGameOver() {
    this.isFinished = true;
    this.finishedText = "GAME OVER";

    this.updateHighScore();
  }

  setGameWin() {
    this.isFinished = true;
    this.finishedText = "YOU WIN";

    this.updateHighScore();
  }

  updateHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score; // Ažuriraj najbolji rezultat
      localStorage.setItem("web2lab3-highScore", this.highScore); // Spremi u local storage
    }
  }

  drawStatus(ctx, canvasWidth) {
    ctx.textAlign = "right";
    ctx.textBaseline = "top";

    ctx.font = "3em 'Roboto'";

    ctx.fillStyle = "black";

    ctx.fillText(`High score: ${this.highScore}`, canvasWidth - 10, 10);
    ctx.fillText(`Score: ${this.score}`, canvasWidth - 10, 50);
  }

  drawGameFinished(ctx, canvasWidth, canvasHeight) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "12vw 'Roboto'";

    ctx.fillStyle = "black";

    ctx.fillText(this.finishedText, canvasWidth / 2, canvasHeight / 2);
  }
}
