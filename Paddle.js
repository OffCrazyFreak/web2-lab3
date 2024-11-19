export default class Paddle {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;

    this.width = canvasWidth / 4;
    this.height = 20;

    this.x = canvasWidth / 2 - this.width / 2;
    this.y = canvasHeight - this.height;

    this.speed = 8;

    this.dx = 0;
  }

  draw(ctx) {
    ctx.shadowBlur = 10;
    ctx.shadowColor = "darkred";

    ctx.fillStyle = "darkred";

    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, [40]);
    ctx.fill();

    ctx.shadowBlur = 0;
  }

  move() {
    this.x += this.dx;

    // Sprečavanje da palica izađe izvan granica
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.canvasWidth) {
      this.x = this.canvasWidth - this.width;
    }
  }

  setDirection(direction) {
    this.dx = this.speed * direction;
  }

  addControls() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "d") {
        this.dx = this.speed; // Kretanje desno
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        this.dx = -this.speed; // Kretanje lijevo
      }
    });

    document.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === "a" ||
        e.key === "d"
      ) {
        this.dx = 0; // Zaustavljanje palice
      }
    });
  }
}
