/**
 * ====================================================================
 *  📸 DETAILED ROPE & ZIGZAG MEMORIES FOR ANU
 * ====================================================================
 * 
 * Features:
 * 1. Connects all photos with a realistic hanging twine rope & fairy lights.
 * 2. Alternating round zigzag layout with natural tilt angles.
 * 3. Wooden clothespins holding each photo with metallic spring detail.
 * 4. Gentle wind sway pendulum animation on hover/touch.
 * 5. Pure photos with no phrase clutter.
 * 6. High-res Lightbox modal with next/prev navigation.
 */

let currentPhotoIndex = 0;
let photosList = [];

function initMemories() {
  const wrapper = document.getElementById('rope-memories-wrapper');
  const photosContainer = document.getElementById('rope-photos-container');
  const svgRope = document.getElementById('rope-svg-path');
  const lightsContainer = document.getElementById('rope-fairy-lights');

  if (!wrapper || !photosContainer) return;

  const memories = (typeof SURPRISE_CONFIG !== 'undefined' && SURPRISE_CONFIG.memories) 
    ? SURPRISE_CONFIG.memories 
    : [];

  const vTag = 'v=' + Date.now();
  photosList = memories.map(m => m.image + (m.image.includes('?') ? '&' : '?') + vTag);
  photosContainer.innerHTML = '';

  // Zigzag angles and offsets
  const tiltAngles = [-3.5, 3, -2, 2.5, -4, 3.5, -2.5, 2];

  memories.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `rope-photo-card ${index % 2 === 0 ? 'zigzag-left' : 'zigzag-right'}`;
    const tilt = tiltAngles[index % tiltAngles.length];
    card.style.setProperty('--card-tilt', `${tilt}deg`);
    card.dataset.index = index;

    // Wooden Clothespin with 3D spring detailing
    const pin = document.createElement('div');
    pin.className = 'wooden-pin';
    pin.innerHTML = `
      <div class="pin-wood"></div>
      <div class="pin-spring"></div>
    `;

    // Photo Print Frame (Pure photo, no text)
    const photoFrame = document.createElement('div');
    photoFrame.className = 'photo-frame';

    const img = document.createElement('img');
    img.src = item.image + (item.image.includes('?') ? '&' : '?') + vTag;
    img.alt = `Moment with Anu ${index + 1}`;
    img.loading = 'lazy';

    photoFrame.appendChild(img);
    card.appendChild(pin);
    card.appendChild(photoFrame);

    // Click to open high-res lightbox
    card.addEventListener('click', () => {
      openPhotoLightbox(index);
    });

    photosContainer.appendChild(card);
  });

  // Calculate and draw the connecting rope curve after DOM layout settles
  setTimeout(drawConnectingRope, 150);
  setTimeout(drawConnectingRope, 600); // re-verify after images load
}

// ── Calculate and Draw the Winding Rope Curve ─────────────────────────
function drawConnectingRope() {
  const wrapper = document.getElementById('rope-memories-wrapper');
  const svgPath = document.getElementById('rope-svg-path');
  const lightsContainer = document.getElementById('rope-fairy-lights');
  if (!wrapper || !svgPath) return;

  const pins = wrapper.querySelectorAll('.wooden-pin');
  if (pins.length === 0) return;

  const wrapperRect = wrapper.getBoundingClientRect();
  const points = [];

  pins.forEach(pin => {
    const rect = pin.getBoundingClientRect();
    points.push({
      x: (rect.left + rect.width / 2) - wrapperRect.left,
      y: (rect.top + rect.height / 3) - wrapperRect.top
    });
  });

  if (points.length < 2) return;

  // Build a continuous smooth catenary curve through all the pins
  let d = `M ${points[0].x} ${points[0].y}`;
  let lightsHtml = '';

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];

    // Calculate a natural downward catenary droop for the rope between photos
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const droop = Math.min(dist * 0.22, 50); // natural sag under gravity

    const cx1 = p0.x + dx * 0.35;
    const cy1 = p0.y + dy * 0.35 + droop;

    const cx2 = p0.x + dx * 0.65;
    const cy2 = p0.y + dy * 0.65 + droop;

    d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`;

    // Add glowing fairy light bulb on the sagging rope midpoint
    const midX = (p0.x + p1.x) / 2;
    const midY = (p0.y + p1.y) / 2 + droop * 0.85;
    lightsHtml += `<div class="fairy-light-bulb" style="left: ${midX}px; top: ${midY}px; animation-delay: ${(i * 0.35) % 2}s;"></div>`;
  }

  svgPath.setAttribute('d', d);

  if (lightsContainer) {
    lightsContainer.innerHTML = lightsHtml;
  }
}

window.addEventListener('resize', () => {
  if (document.getElementById('scene-04')?.classList.contains('active')) {
    drawConnectingRope();
  }
});

// ── High-Res Photo Lightbox ───────────────────────────────────────────
function openPhotoLightbox(index) {
  currentPhotoIndex = index;
  const lightbox = document.getElementById('photo-lightbox');
  const imgEl = document.getElementById('lightbox-img');
  const counterEl = document.getElementById('lightbox-counter');

  if (!lightbox || !imgEl) return;

  imgEl.src = photosList[currentPhotoIndex];
  if (counterEl) {
    counterEl.textContent = `${currentPhotoIndex + 1} / ${photosList.length}`;
  }

  lightbox.classList.add('open');
}

function closePhotoLightbox() {
  const lightbox = document.getElementById('photo-lightbox');
  if (lightbox) lightbox.classList.remove('open');
}

function nextLightboxPhoto() {
  if (photosList.length === 0) return;
  currentPhotoIndex = (currentPhotoIndex + 1) % photosList.length;
  openPhotoLightbox(currentPhotoIndex);
}

function prevLightboxPhoto() {
  if (photosList.length === 0) return;
  currentPhotoIndex = (currentPhotoIndex - 1 + photosList.length) % photosList.length;
  openPhotoLightbox(currentPhotoIndex);
}

// Bind lightbox control keys & buttons
document.addEventListener('DOMContentLoaded', () => {
  const btnClose = document.getElementById('lightbox-close');
  const btnNext = document.getElementById('lightbox-next');
  const btnPrev = document.getElementById('lightbox-prev');
  const lightbox = document.getElementById('photo-lightbox');

  if (btnClose) btnClose.addEventListener('click', closePhotoLightbox);
  if (btnNext) btnNext.addEventListener('click', nextLightboxPhoto);
  if (btnPrev) btnPrev.addEventListener('click', prevLightboxPhoto);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closePhotoLightbox();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('open')) {
      if (e.key === 'Escape') closePhotoLightbox();
      if (e.key === 'ArrowRight') nextLightboxPhoto();
      if (e.key === 'ArrowLeft') prevLightboxPhoto();
    }
  });
});
