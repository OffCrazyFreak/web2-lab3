export default class Brick {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.isBroken = false;
  }

  draw(ctx) {
    if (!this.isBroken) {
      ctx.shadowBlur = 3;

      ctx.shadowColor = "black";
      ctx.fillStyle = "skyblue";

      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.shadowBlur = 0;
    }
  }

  hit() {
    this.isBroken = true;
  }
}
