/**
 * ====================================================================
 *  ⏳ BIRTHDAY COUNTDOWN & MIDNIGHT CELEBRATION
 * ====================================================================
 * 
 * Calculates real-time days, hours, minutes, seconds.
 * Triggers the Midnight Celebration Banner when the special time arrives.
 */

let countdownTimer = null;

function initCountdown() {
  const clockContainer = document.getElementById('countdown-clock');
  const celebrationBanner = document.getElementById('celebration-banner');
  if (!clockContainer || !celebrationBanner) return;

  const targetDate = new Date(SURPRISE_CONFIG.birthdayDate).getTime();
  const alwaysCelebrate = SURPRISE_CONFIG.alwaysShowCelebration;

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0 || alwaysCelebrate) {
      // Birthday time or celebration mode!
      clockContainer.style.display = 'none';
      celebrationBanner.style.display = 'block';
      if (countdownTimer) clearInterval(countdownTimer);
      return;
    }

    clockContainer.style.display = 'flex';
    celebrationBanner.style.display = 'none';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const elDays = document.getElementById('count-days');
    const elHours = document.getElementById('count-hours');
    const elMinutes = document.getElementById('count-minutes');
    const elSeconds = document.getElementById('count-seconds');

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  update();
  countdownTimer = setInterval(update, 1000);

  // Preview Toggle Button allows user to preview both modes anytime
  const toggleBtn = document.getElementById('toggle-mode-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (clockContainer.style.display === 'none') {
        clockContainer.style.display = 'flex';
        celebrationBanner.style.display = 'none';
        toggleBtn.textContent = 'Preview Midnight Celebration ✨';
      } else {
        clockContainer.style.display = 'none';
        celebrationBanner.style.display = 'block';
        toggleBtn.textContent = 'Preview Live Countdown ⏳';
        if (typeof launchMagicalBurst === 'function') {
          launchMagicalBurst();
        }
      }
    });
  }
}
