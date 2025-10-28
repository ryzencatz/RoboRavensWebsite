// typewriter effect
document.addEventListener('DOMContentLoaded', () => {
  const outputElement = document.getElementById('typed-output');
  const fullText = "RoboRavens here";
  const goldWord = "RoboRavens";
  const goldStart = fullText.indexOf(goldWord);
  const goldEnd = goldStart + goldWord.length;
  const typingSpeed = 100;

  let i = 0;
  let goldSpan = null;

  function type() {
    if (i < fullText.length) {
      const char = fullText.charAt(i);
      
      // When we hit the start of the gold word
      if (i === goldStart) {
        goldSpan = document.createElement('span');
        goldSpan.classList.add('gold-text');
        outputElement.appendChild(goldSpan);
      }

      // If we're currently typing the gold word
      if (i >= goldStart && i < goldEnd) {
        goldSpan.textContent += char;
      } else {
        const grayChar = document.createElement('span');
        grayChar.classList.add('gray-text');
        grayChar.textContent = char;
        outputElement.appendChild(grayChar);
      }

      i++;
      setTimeout(type, typingSpeed);
    }
  }

  outputElement.textContent = ''; // clear
  type();
});


// circuit background
const canvas = document.getElementById("circuit-bg");
    const ctx = canvas.getContext("2d");
    let w, h, particles;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = Array.from({length: 60}, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      }));
    }
    window.addEventListener("resize", resize);
    resize();

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#a73b4dff"; // RoboRavens gold/red accent
        ctx.fill();
      });

      // connect nearby points
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.strokeStyle = "rgba(156, 31, 52, 0.3)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }
    draw();
