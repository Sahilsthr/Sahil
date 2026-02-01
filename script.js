const title = document.querySelector("h1");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const responseText = document.getElementById("responseText");
const gif = document.querySelector(".gif");

const hoverSound = document.getElementById("hoverSound");
const yesSound = document.getElementById("yesSound");
const noSound = document.getElementById("noSound");

// =====================
// YES BUTTON
// =====================
yesBtn.addEventListener("click", () => {
  responseText.textContent = "Hooray! I'm so happy! 💖 💞";
  gif.src =
    "https://i.pinimg.com/originals/b4/65/34/b46534530b0ef3ffac6636f068dd2e12.gif";

  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  title.style.color = "transparent";
  title.style.height = "0";
  title.style.margin = "0";

  yesSound.play().catch(() => {});

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
  });
});

// =====================
// NO BUTTON ESCAPE LOGIC
// =====================
let escapeCount = 0;
const MAX_ESCAPES = 10;

function moveNoButton() {
  if (escapeCount >= MAX_ESCAPES) return;

  escapeCount++;

  const padding = 20;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  hoverSound.currentTime = 0;
  hoverSound.play().catch(() => {});
}

// Desktop
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// =====================
// NO BUTTON CLICK (after 10 escapes)
// =====================
noBtn.addEventListener("click", () => {
  if (escapeCount < MAX_ESCAPES) return;

  responseText.textContent = "No? Okay, but you're still my valentine! 🤭";

  gif.src =
    "https://i.pinimg.com/originals/3e/47/7e/3e477e83c35e2a7a38f19ccdad163faa.gif";

  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  title.style.display = "none";

  noSound.play().catch(() => {});
});

// =====================
// HEARTS CANVAS ANIMATION
// =====================
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -50;
    this.size = Math.random() * 20 + 10;
    this.speed = Math.random() * 2 + 1;
    this.color = Math.random() > 0.5 ? "#ff6f61" : "#ff3b2f";
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(
      this.x - this.size / 2,
      this.y - this.size / 4,
      this.x - this.size,
      this.y + this.size / 2,
      this.x,
      this.y + this.size,
    );
    ctx.bezierCurveTo(
      this.x + this.size,
      this.y + this.size / 2,
      this.x + this.size / 2,
      this.y - this.size / 4,
      this.x,
      this.y,
    );
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = -50;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

// Init hearts
for (let i = 0; i < 40; i++) {
  hearts.push(new Heart());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart) => heart.update());
  requestAnimationFrame(animate);
}

animate();

// Mouse hearts (limit)
document.addEventListener("mousemove", (e) => {
  if (hearts.length > 150) return;

  const heart = new Heart();
  heart.x = e.clientX;
  heart.y = e.clientY;
  heart.size = 10;
  heart.speed = 1;
  hearts.push(heart);
});

// Resize fix
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
