/**
 * ====================================================================
 *  🤍 "A BIRTHDAY LETTER THAT YOU CAN WALK THROUGH" - MASTER SCRIPT
 * ====================================================================
 * 
 * Orchestrates:
 * - 12 Storytelling Scenes & Cinematic Flow
 * - Typewriter text reveals
 * - Envelopes & Modal Letters
 * - Special Reasons interactive pills
 * - Timeline milestones
 * - The Main Birthday Letter & Secrets
 * - Keepsake & Replay
 */

class StoryExperience {
  constructor() {
    this.currentSceneIndex = 1;
    this.totalScenes = 12;
    this.scenes = [];
    this.isTransitioning = false;

    this.initDOM();
    this.populateConfigData();
    this.bindEvents();
    this.showScene(1);
  }

  initDOM() {
    this.scenes = Array.from(document.querySelectorAll('.story-scene'));
    this.totalScenes = this.scenes.length;
    this.progressBar = document.getElementById('top-progress-bar');
    this.modal = document.getElementById('global-modal');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
  }

  // ── Populate dynamic data from config.js ────────────────────────────
  populateConfigData() {
    if (typeof SURPRISE_CONFIG === 'undefined') return;

    // Names & Cities
    const replaceText = (selector, text) => {
      document.querySelectorAll(selector).forEach(el => el.textContent = text);
    };

    replaceText('.her-name-text', SURPRISE_CONFIG.herName || 'Anu');
    replaceText('.your-name-text', SURPRISE_CONFIG.yourName || 'With all my love');
    if (SURPRISE_CONFIG.herCity) replaceText('.her-city-text', SURPRISE_CONFIG.herCity);
    if (SURPRISE_CONFIG.yourCity) replaceText('.your-city-text', SURPRISE_CONFIG.yourCity);
    if (SURPRISE_CONFIG.distanceText) replaceText('.distance-text', SURPRISE_CONFIG.distanceText);

    // Envelopes (Scene 05)
    this.renderEnvelopes();

    // Floating Reasons (Scene 07)
    this.renderReasons();

    // Main Letter (Scene 10)
    this.renderMainLetter();
  }

  renderEnvelopes() {
    const grid = document.getElementById('envelopes-grid');
    if (!grid || !SURPRISE_CONFIG.letters) return;

    grid.innerHTML = '';
    SURPRISE_CONFIG.letters.forEach((letter, i) => {
      const item = document.createElement('div');
      item.className = 'envelope-item';

      const imgUrl = letter.image ? (letter.image + (letter.image.includes('?') ? '&' : '?') + 'v=' + Date.now()) : '';
      const thumbHtml = imgUrl 
        ? `<div class="envelope-mini-thumb"><img src="${imgUrl}" alt="Anu"></div>` 
        : `<span class="envelope-icon">✉</span>`;

      item.innerHTML = `
        ${thumbHtml}
        <span class="envelope-number">LETTER 0${i + 1}</span>
        <h4 class="envelope-title">${letter.preview}</h4>
        <span class="envelope-action">Khol Kar Padho &rarr;</span>
      `;
      item.addEventListener('click', () => {
        this.openLetterModal(i);
      });
      grid.appendChild(item);
    });
  }

  openLetterModal(index) {
    if (typeof index !== 'number') {
      index = SURPRISE_CONFIG.letters.findIndex(l => l.heading === index.heading);
      if (index === -1) index = 0;
    }

    const letter = SURPRISE_CONFIG.letters[index];
    if (!letter) return;

    const tagEl = document.getElementById('modal-tag');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    const actionBtn = document.getElementById('modal-action-btn');

    if (tagEl) tagEl.textContent = letter.moodTag || `Unspoken Thought 0${letter.number || (index + 1)}`;
    if (titleEl) titleEl.textContent = letter.heading || 'Dil Ki Baat';
    if (bodyEl) {
      const modalImgUrl = letter.image ? (letter.image + (letter.image.includes('?') ? '&' : '?') + 'v=' + Date.now()) : '';
      const imgHtml = modalImgUrl 
        ? `<div class="unspoken-modal-img-wrap"><img src="${modalImgUrl}" alt="Anu" class="unspoken-modal-img"></div>` 
        : '';
      
      const formattedMessage = letter.message
        .split('\n\n')
        .map(p => `<p class="unspoken-modal-paragraph">${p.replace(/\n/g, '<br>')}</p>`)
        .join('');

      bodyEl.innerHTML = `
        ${imgHtml}
        <div class="unspoken-modal-text">
          ${formattedMessage}
        </div>
      `;
    }

    if (actionBtn) {
      const isLast = index >= SURPRISE_CONFIG.letters.length - 1;
      actionBtn.innerHTML = isLast 
        ? `<span>Aage Badho 🤍</span> <span class="arrow">&rarr;</span>` 
        : `<span>Read Next</span> <span class="arrow">&rarr;</span>`;
      
      actionBtn.onclick = () => {
        if (isLast) {
          if (this.modal) this.modal.classList.remove('open');
          this.nextScene();
        } else {
          this.openLetterModal(index + 1);
        }
      };
    }

    if (this.modal) this.modal.classList.add('open');
  }

  renderReasons() {
    const cloud = document.getElementById('reasons-cloud');
    if (!cloud || !SURPRISE_CONFIG.reasons) return;

    cloud.innerHTML = '';
    SURPRISE_CONFIG.reasons.forEach((reason, i) => {
      const pill = document.createElement('button');
      pill.className = 'reason-pill';
      pill.textContent = reason.tag;
      pill.addEventListener('click', () => {
        this.openReasonModal(i);
      });
      cloud.appendChild(pill);
    });
  }

  openReasonModal(index) {
    if (typeof index !== 'number') {
      index = SURPRISE_CONFIG.reasons.findIndex(r => r.tag === index.tag);
      if (index === -1) index = 0;
    }

    const reason = SURPRISE_CONFIG.reasons[index];
    if (!reason) return;

    const tagEl = document.getElementById('modal-tag');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    const actionBtn = document.getElementById('modal-action-btn');

    if (tagEl) tagEl.textContent = reason.short || 'A Little Detail';
    if (titleEl) titleEl.textContent = reason.tag;
    if (bodyEl) {
      bodyEl.innerHTML = `
        <p style="font-family: var(--font-serif); font-size: 1.35rem; line-height: 1.85; color: var(--text-primary);">
          ${reason.expanded}
        </p>
      `;
    }

    if (actionBtn) {
      const isLast = index >= SURPRISE_CONFIG.reasons.length - 1;
      actionBtn.innerHTML = isLast
        ? `<span>Samajh Gayi 🤍</span>`
        : `<span>Read Next</span> <span class="arrow">&rarr;</span>`;
      
      actionBtn.onclick = () => {
        if (isLast) {
          if (this.modal) this.modal.classList.remove('open');
        } else {
          this.openReasonModal(index + 1);
        }
      };
    }

    if (this.modal) this.modal.classList.add('open');
  }

  renderMainLetter() {
    const letter = SURPRISE_CONFIG.mainLetter;
    if (!letter) return;

    const salutationEl = document.getElementById('letter-salutation-text');
    const bodyContainer = document.getElementById('letter-paragraphs-container');
    const closingEl = document.getElementById('letter-closing-text');
    const signatureEl = document.getElementById('letter-signature-text');

    if (salutationEl) {
      salutationEl.textContent = `${letter.salutation || 'Dear'} ${SURPRISE_CONFIG.herName},`;
    }

    if (bodyContainer && letter.paragraphs) {
      bodyContainer.innerHTML = '';
      letter.paragraphs.forEach(p => {
        const pEl = document.createElement('p');
        pEl.className = 'letter-paragraph';
        pEl.textContent = p;
        bodyContainer.appendChild(pEl);
      });
    }

    if (closingEl) closingEl.textContent = letter.closing || 'Always,';
    if (signatureEl) signatureEl.textContent = SURPRISE_CONFIG.yourName || 'Me';
  }

  // ── Scene Navigation ────────────────────────────────────────────────
  showScene(index) {
    if (index < 1 || index > this.totalScenes) return;

    this.scenes.forEach(scene => {
      scene.classList.remove('active');
    });

    const activeScene = this.scenes[index - 1];
    if (activeScene) {
      activeScene.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.onSceneEnter(activeScene.id);
    }

    this.currentSceneIndex = index;
    this.updateProgressBar();
  }

  nextScene() {
    if (this.currentSceneIndex < this.totalScenes) {
      this.showScene(this.currentSceneIndex + 1);
    }
  }

  prevScene() {
    if (this.currentSceneIndex > 1) {
      this.showScene(this.currentSceneIndex - 1);
    }
  }

  updateProgressBar() {
    if (this.progressBar) {
      const percentage = ((this.currentSceneIndex - 1) / (this.totalScenes - 1)) * 100;
      this.progressBar.style.width = `${percentage}%`;
    }
  }

  onSceneEnter(sceneId) {
    switch (sceneId) {
      case 'scene-02':
        // Scene 02: Typewriter text sequence
        this.runScene2Sequence();
        break;

      case 'scene-03':
        // Scene 03: Draw distance constellation line
        if (typeof drawConstellationPath === 'function') {
          setTimeout(drawConstellationPath, 300);
        }
        break;

      case 'scene-04':
        // Scene 04: Initialize rope memories & recalculate rope
        if (typeof initMemories === 'function') {
          initMemories();
        }
        if (typeof drawConnectingRope === 'function') {
          setTimeout(drawConnectingRope, 200);
          setTimeout(drawConnectingRope, 600);
        }
        break;

      case 'scene-09':
        // Scene 09: Countdown
        if (typeof initCountdown === 'function') {
          initCountdown();
        }
        break;

      case 'scene-11':
        // Scene 11: Reset secret tap state
        this.resetScene11();
        break;
    }
  }

  // ── Scene 02 Typewriter Sequence ────────────────────────────────────
  runScene2Sequence() {
    const textEl = document.getElementById('typewriter-target');
    const revealEl = document.getElementById('her-name-container');
    if (!textEl) return;

    textEl.textContent = '';
    if (revealEl) revealEl.classList.remove('show');

    const phrase1 = "Faasle shayad thodi doori bana sakte hain...";
    const phrase2 = "Lekin dil ke rishton ko nahi... especially jab koi itna special ho.";

    let i = 0;
    const typeWriter = (text, callback) => {
      textEl.textContent = '';
      let charIdx = 0;
      const interval = setInterval(() => {
        if (charIdx < text.length) {
          textEl.textContent += text.charAt(charIdx);
          charIdx++;
        } else {
          clearInterval(interval);
          if (callback) setTimeout(callback, 1400);
        }
      }, 42);
    };

    typeWriter(phrase1, () => {
      typeWriter(phrase2, () => {
        if (revealEl) {
          revealEl.classList.add('show');
        }
      });
    });
  }

  // ── Scene 11 "One Last Thing" Secret Tap ─────────────────────────────
  resetScene11() {
    const btn = document.getElementById('btn-secret-tap');
    const finalMsg = document.getElementById('final-burst-message');
    const btnNext = document.getElementById('btn-scene-11-next');
    if (btn) btn.style.display = 'flex';
    if (finalMsg) finalMsg.style.display = 'none';
    if (btnNext) btnNext.style.display = 'none';
  }

  triggerSecretTap() {
    const btn = document.getElementById('btn-secret-tap');
    const finalMsg = document.getElementById('final-burst-message');
    const btnNext = document.getElementById('btn-scene-11-next');

    if (btn) btn.style.display = 'none';
    if (finalMsg) finalMsg.style.display = 'block';
    if (btnNext) btnNext.style.display = 'inline-flex';

    if (typeof launchMagicalBurst === 'function') {
      launchMagicalBurst();
    }
  }

  // ── Event Bindings ──────────────────────────────────────────────────
  bindEvents() {
    // Scene 01: Open Your Surprise button
    const btnStart = document.getElementById('btn-start-surprise');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        // Start soft ambient piano music
        if (window.musicController) {
          window.musicController.play();
        }
        this.nextScene();
      });
    }

    // Next Scene buttons
    document.querySelectorAll('.btn-next-scene').forEach(btn => {
      btn.addEventListener('click', () => {
        this.nextScene();
      });
    });

    // Scene 11 secret tap button
    const btnSecret = document.getElementById('btn-secret-tap');
    if (btnSecret) {
      btnSecret.addEventListener('click', () => {
        this.triggerSecretTap();
      });
    }

    // Scene 11 Next button
    const btnNext11 = document.getElementById('btn-scene-11-next');
    if (btnNext11) {
      btnNext11.addEventListener('click', () => {
        this.nextScene();
      });
    }

    // Scene 12 Replay button
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) {
      btnReplay.addEventListener('click', () => {
        this.showScene(2); // Jump back to the emotional opening
      });
    }

    // Modal close bindings
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => {
        if (this.modal) this.modal.classList.remove('open');
      });
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.modal.classList.remove('open');
        }
      });
    }

    // Keyboard navigation (Arrow keys / Space)
    window.addEventListener('keydown', (e) => {
      if (this.modal && this.modal.classList.contains('open')) {
        if (e.key === 'Escape') this.modal.classList.remove('open');
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        this.nextScene();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        this.prevScene();
      }
    });
  }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.storyExperience = new StoryExperience();
});
