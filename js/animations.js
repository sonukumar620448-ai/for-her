/**
 * ====================================================================
 *  ✨ CANVAS & VISUAL EFFECTS ANIMATIONS
 * ====================================================================
 * 
 * Features:
 * 1. Twinkling celestial night sky canvas with golden dust motes.
 * 2. Constellation curved line generator between You & Her.
 * 3. Magical stardust & heart confetti explosion for Scene 11.
 */

class StardustBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 90;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouse = { x: -1000, y: -1000 };

    this.resize();
    this.initParticles();
    this.bindEvents();
    this.render();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.8 + 0.5,
        baseAlpha: Math.random() * 0.7 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.25 - 0.05, // subtle upward drift like warm ember dust
        color: Math.random() > 0.3 ? '#E9CFA8' : '#F5EDE4'
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.initParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let p of this.particles) {
      // Movement
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.y < 0) p.y = this.height;
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;

      // Twinkle
      p.alpha += p.twinkleSpeed;
      if (p.alpha > 0.9 || p.alpha < 0.2) {
        p.twinkleSpeed = -p.twinkleSpeed;
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
      this.ctx.shadowBlur = p.radius > 1.2 ? 6 : 0;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
    this.ctx.shadowBlur = 0;
    requestAnimationFrame(() => this.render());
  }
}

// ── Trigger Constellation Map Line ────────────────────────────────────
function drawConstellationPath() {
  const path = document.getElementById('map-connection-line');
  if (!path) return;
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.getBoundingClientRect(); // trigger reflow
  path.style.transition = 'stroke-dashoffset 2.4s cubic-bezier(0.25, 1, 0.5, 1)';
  path.style.strokeDashoffset = '0';
}

// ── Confetti & Stardust Explosion (Scene 11) ───────────────────────────
function launchMagicalBurst() {
  // If canvas-confetti library is loaded
  if (typeof confetti === 'function') {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#E9CFA8', '#D8A7A7', '#F5EDE4', '#FFD700', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Heart explosion in center
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.6 },
        shapes: ['circle', 'star'],
        colors: ['#D8A7A7', '#E9CFA8', '#FFF']
      });
    }, 400);
  }
}

// Initialize Stardust when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new StardustBackground('stars-canvas');
});
