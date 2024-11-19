export default class Ball {
  constructor(canvasWidth, canvasHeight, ballRadius, ballSpeed) {
    this.canvasWidth = canvasWidth;

    this.radius = ballRadius;

    this.speed = ballSpeed;

    this.x = canvasWidth / 2;
    this.y = canvasHeight - ballRadius - 20;

    // Generiraj slučajni kut između -45° i 45° (u radijanima)
    const angle = Math.random() * (Math.PI / 4) - Math.PI / 4;
    this.dx = this.speed * Math.sin(angle);
    this.dy = -Math.abs(this.speed * Math.cos(angle)); // Uvijek prema gore
  }

  draw(ctx) {
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    ctx.fillStyle = "darkgray";
    ctx.fill();

    ctx.closePath();
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    // Odbijanje od zidova
    if (this.x - this.radius < 0 || this.x + this.radius > this.canvasWidth) {
      this.dx *= -1;
    }
    if (this.y - this.radius < 0) {
      this.dy *= -1;
    }
  }

  bounce() {
    this.dy *= -1;
  }
}
