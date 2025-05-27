const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
let speed = 25;
let message = "Te Amo";
let color = "#ff69b4";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fontSize = 14;
let columns = canvas.width / fontSize;
let drops = Array.from({ length: columns }).fill(1);

// CONTROLES
document.getElementById("speedControl").addEventListener("input", (e) => {
  speed = parseInt(e.target.value);
});

document.getElementById("textInput").addEventListener("input", (e) => {
  message = e.target.value;
});

// EXPLOSIONES AL CLIC
canvas.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  explosion(x, y);
});

function explosion(x, y) {
  const parts = 20;
  for (let i = 0; i < parts; i++) {
    const angle = (Math.PI * 2 * i) / parts;
    const dx = Math.cos(angle) * 5;
    const dy = Math.sin(angle) * 5;
    animateExplosion(x, y, dx, dy);
  }
}

function animateExplosion(x, y) {
    const particles = 50; // Número de partículas para formar el corazón
    const size = 90; // Tamaño del corazón (ajustable)
    const colors = ["#ff0000", "#ff3366", "#ff6699", "#ff9999"]; // Paleta rosa/rojo
  
    for (let i = 0; i < particles; i++) {
      const angle = (Math.PI * 2 * i) / particles;
      // Fórmula paramétrica de un corazón
      const t = angle * Math.PI;
      const heartX = 16 * Math.pow(Math.sin(t), 3);
      const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  
      animateParticle(
        x,
        y,
        (heartX * size) / 20, // Escala las coordenadas X del corazón
        (heartY * size) / 20,  // Escala las coordenadas Y del corazón
        colors[i % colors.length] // Color rotativo
      );
    }
  }
  
  function animateParticle(x, y, dx, dy, color) {
    let life = 60; // Duración más larga para mejor visualización
    const size = 5 + Math.random() * 5; // Tamaño aleatorio
  
    function frame() {
      if (life <= 0) return;
  
      // Posición actual con suavizado (easing)
      const progress = 1 - life / 60;
      const currentX = x + dx * progress;
      const currentY = y + dy * progress;
  
      // Dibuja un círculo (partícula del corazón)
      ctx.beginPath();
      ctx.arc(currentX, currentY, size * (life / 60), 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
  
      life--;
      requestAnimationFrame(frame);
    }
    frame();
  }
function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Arial`;

  for (let i = 0; i < drops.length; i++) {
    const text = message;
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
    draw();
  }, 1000 / speed);
}

animate();