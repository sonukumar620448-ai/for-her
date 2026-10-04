/**
 * ====================================================================
 *  🎵 MUSIC CONTROLLER — "SAHIBA" WITH SOULFUL LOW FADE-IN
 * ====================================================================
 * 
 * Features:
 * 1. Ultra-smooth low fade-in input: starts at 0% and gently swells over
 *    5 seconds into a warm, comfortable listening level.
 * 2. Attempts to play "Sahiba" (assets/music/sahiba.mp3 or birthday-song.mp3).
 * 3. Graceful Fallback: Generates a soft, romantic acoustic ambient piano
 *    using Web Audio API if no MP3 file is present.
 */

class MusicController {
  constructor() {
    this.isPlaying = false;
    this.audioElement = null;
    this.audioContext = null;
    this.isGenerative = false;
    this.generativeInterval = null;
    this.fadeInterval = null;
    this.btn = document.getElementById('music-toggle');
    this.topBar = document.querySelector('.top-bar');

    this.initAudio();
    this.bindEvents();
  }

  initAudio() {
    const candidatePaths = [
      'assets/music/sahiba.webm',
      'assets/music/sahiba.m4a',
      'assets/music/sahiba.mp3',
      (typeof SURPRISE_CONFIG !== 'undefined' ? SURPRISE_CONFIG.customAudioPath : null)
    ].filter(Boolean);

    let pathIndex = 0;
    const loadAudio = () => {
      if (pathIndex < candidatePaths.length) {
        const src = candidatePaths[pathIndex++];
        this.audioElement = new Audio(src);
        this.audioElement.loop = true;
        this.audioElement.volume = 0.0;
        this.audioElement.preload = 'auto';
        this.audioElement.addEventListener('error', () => {
          loadAudio();
        }, { once: true });
      } else {
        console.info('Audio file fallback activated ✨');
        this.isGenerative = true;
      }
    };

    loadAudio();
  }

  bindEvents() {
    if (this.btn) {
      this.btn.addEventListener('click', () => {
        this.toggle();
      });
    }
  }

  play() {
    if (this.isPlaying) return;

    if (!this.isGenerative && this.audioElement) {
      this.audioElement.volume = 0.0;
      this.audioElement.play().then(() => {
        this.isPlaying = true;
        this.updateUI(true);
        this.startLowFadeIn(0.55, 4500); // Gentle 4.5s low fade-in
      }).catch(err => {
        console.warn('Audio autoplay blocked, activating ambient generator:', err);
        this.isGenerative = true;
        this.startGenerativeAmbient();
      });
    } else {
      this.startGenerativeAmbient();
    }
  }

  // ── Soulful Low Fade-In ─────────────────────────────────────────────
  startLowFadeIn(targetVolume = 0.55, durationMs = 4500) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const stepTime = 100;
    const steps = durationMs / stepTime;
    const increment = targetVolume / steps;

    let current = 0.0;
    this.fadeInterval = setInterval(() => {
      if (!this.isPlaying || !this.audioElement) {
        clearInterval(this.fadeInterval);
        return;
      }

      current += increment;
      if (current >= targetVolume) {
        this.audioElement.volume = targetVolume;
        clearInterval(this.fadeInterval);
      } else {
        this.audioElement.volume = current;
      }
    }, stepTime);
  }

  pause() {
    if (!this.isPlaying) return;

    if (this.fadeInterval) clearInterval(this.fadeInterval);

    if (this.audioElement && !this.isGenerative) {
      // Soft fade-out
      let current = this.audioElement.volume;
      const fadeOut = setInterval(() => {
        current = Math.max(0, current - 0.08);
        if (this.audioElement) this.audioElement.volume = current;
        if (current <= 0) {
          clearInterval(fadeOut);
          if (this.audioElement) this.audioElement.pause();
        }
      }, 50);
    }

    if (this.isGenerative) {
      this.stopGenerativeAmbient();
    }

    this.isPlaying = false;
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (!this.btn) return;
    if (playing) {
      this.btn.classList.add('music-playing');
      const textSpan = this.btn.querySelector('.music-label');
      if (textSpan) textSpan.textContent = 'Sahiba 🤍';
    } else {
      this.btn.classList.remove('music-playing');
      const textSpan = this.btn.querySelector('.music-label');
      if (textSpan) textSpan.textContent = 'Play Sahiba';
    }
  }

  // ── Generative Warm Ambient Soundscape ──────────────────────────────
  startGenerativeAmbient() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      this.isPlaying = true;
      this.updateUI(true);

      const scale = [
        138.59, 155.56, 174.61, 207.65, 233.08,
        277.18, 311.13, 349.23, 415.30, 466.16,
        554.37, 622.25, 698.46, 830.61
      ];

      // Low initial chord with fade
      this.playNote(scale[0], 0.12, 6);
      this.playNote(scale[2], 0.10, 5);
      this.playNote(scale[4], 0.08, 5);

      this.generativeInterval = setInterval(() => {
        if (!this.isPlaying) return;
        const randomNote = scale[Math.floor(Math.random() * scale.length)];
        const duration = 3.0 + Math.random() * 3.0;
        const gain = 0.05 + Math.random() * 0.08;
        this.playNote(randomNote, gain, duration);

        if (Math.random() > 0.6) {
          const bassNote = scale[Math.floor(Math.random() * 3)];
          this.playNote(bassNote / 2, 0.10, 6);
        }
      }, 1600);

    } catch (e) {
      console.error('Generative audio initialization failed:', e);
    }
  }

  stopGenerativeAmbient() {
    if (this.generativeInterval) {
      clearInterval(this.generativeInterval);
      this.generativeInterval = null;
    }
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }

  playNote(frequency, peakGain, duration) {
    if (!this.audioContext) return;
    try {
      const now = this.audioContext.currentTime;
      const osc1 = this.audioContext.createOscillator();
      const osc2 = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(frequency, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(frequency * 1.002, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + duration);

      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.exponentialRampToValueAtTime(peakGain, now + 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration + 0.1);
      osc2.stop(now + duration + 0.1);
    } catch (e) {}
  }
}

window.musicController = null;
document.addEventListener('DOMContentLoaded', () => {
  window.musicController = new MusicController();
});
