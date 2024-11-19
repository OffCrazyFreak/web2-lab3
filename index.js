import Game from "./Game.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Postavljanje dimenzija Canvas-a
canvas.width = window.innerWidth - 16;
canvas.height = window.innerHeight - 16;

// Konstante
const BRICK_ROWS = 2;
const BRICK_COLS = 4;

const BRICK_PADDING = 6;

const BRICK_WIDTH =
  (canvas.width - (BRICK_COLS + 1) * BRICK_PADDING) / BRICK_COLS;
const BRICK_HEIGHT = canvas.height / 20;

const BALL_RADIUS = canvas.height / 60;
const BALL_SPEED = 5;

// Varijable
let isPaused = false;

let animationId;

let bricks = [];

let paddle = new Paddle(canvas.width, canvas.height);
paddle.addControls();

let ball = new Ball(canvas.width, canvas.height, BALL_RADIUS, BALL_SPEED);

let game = new Game();

// Generiranje cigli
for (let row = 0; row < BRICK_ROWS; row++) {
  for (let col = 0; col < BRICK_COLS; col++) {
    bricks.push(
      new Brick(
        col * (BRICK_WIDTH + BRICK_PADDING) + BRICK_PADDING,
        row * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_PADDING,

        BRICK_WIDTH,
        BRICK_HEIGHT
      )
    );
  }
}

// Funkcije za crtanje elemenata
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bricks.forEach((brick) => brick.draw(ctx));
  paddle.draw(ctx);
  ball.draw(ctx);

  game.drawStatus(ctx, canvas.width); // Prikaži trenutni i najbolji rezultat
}

// Detekcija sudara
function detectCollision() {
  // Ako se loptica sudarila s ciglom
  bricks.forEach((brick) => {
    if (
      !brick.isBroken &&
      ball.x > brick.x &&
      ball.x < brick.x + brick.width &&
      ball.y - BALL_RADIUS < brick.y + brick.height &&
      ball.y + BALL_RADIUS > brick.y
    ) {
      // Određivanje strane sudara
      const ballCenterX = ball.x;
      const ballCenterY = ball.y;

      const isHitFromLeftOrRight =
        ballCenterX < brick.x || ballCenterX > brick.x + brick.width;

      const isHitFromTopOrBottom =
        ballCenterY < brick.y || ballCenterY > brick.y + brick.height;

      if (isHitFromLeftOrRight) {
        ball.dx *= -1; // Promjena smjera na x-osi
      } else if (isHitFromTopOrBottom) {
        ball.dy *= -1; // Promjena smjera na y-osi
      }

      brick.hit(); // Označavanje cigle kao razbijene
      game.addScore(1); // Povećanje rezultata
    }
  });

  if (bricks.every((brick) => brick.isBroken)) {
    game.setGameWin(); // Postavi status igre na pobjedu
  }

  // Ako se loptica sudarila s palicom
  if (
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width &&
    ball.y + BALL_RADIUS >= paddle.y
  ) {
    // Izračun relativne pozicije sudara (-1 lijevo, 0 sredina, 1 desno)
    const relativeHitPosition =
      (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);

    // Postavljanje brzine loptice s konstantnom ukupnom brzinom
    const angle = relativeHitPosition * (Math.PI / 4); // Maksimalni kut je 45°
    ball.dx = ball.speed * Math.sin(angle);
    ball.dy = -ball.speed * Math.cos(angle); // Negativno jer ide prema gore

    // Postavljanje loptice iznad palice
    ball.y = paddle.y - BALL_RADIUS;
  }

  // Ako je loptica otišla ispod palice
  if (ball.y + BALL_RADIUS > canvas.height) {
    game.setGameOver();
  }
}

// Ažuriranje stanja igre
function update() {
  if (game.isFinished) {
    game.drawGameFinished(ctx, canvas.width, canvas.height);
    return;
  }

  if (isPaused) {
    // Prikaži poruku pauze
    ctx.textAlign = "center";

    ctx.font = "12vw 'Roboto'";

    ctx.fillStyle = "black";
    ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);

    return;
  }

  paddle.move();
  ball.move();

  detectCollision();

  draw();

  animationId = requestAnimationFrame(update);
}

// Kontrola za pauzu
document.addEventListener("keydown", (e) => {
  if (e.key === "p" || e.key === "P") {
    isPaused = !isPaused; // Prebacivanje stanja pauze
    if (!isPaused) {
      requestAnimationFrame(update); // Nastavi igru ako nije pauzirana
    }
  }
});

// Pokretanje igre
update();
