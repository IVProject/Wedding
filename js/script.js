window.addEventListener('scroll', function() {
  if (window.innerWidth <= 767) {
    const content = document.querySelector('.hero-content');
    const arrow = document.querySelector('.scroll-arrow');
    if (window.scrollY > 50) {
      content.style.opacity = '1';
      arrow.style.display = 'none';
    } else {
      content.style.opacity = '0';
      arrow.style.display = 'block';
    }
  }
});

// --- Кастомная плавная прокрутка ---
function smoothScrollTo(targetY, duration = 1000) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeInOutCubic
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, startY + diff * ease);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
  const content = document.querySelector('.hero-content');
  if (content) {
    content.style.opacity = '0';
    content.style.transition = 'opacity 1.2s cubic-bezier(.23,1.01,.32,1)';
    setTimeout(() => {
      content.style.opacity = '1';
    }, 200);
  }
  
  const arrow = document.querySelector('.scroll-arrow');
  if (arrow) {
    arrow.addEventListener('click', function() {
      const content = document.querySelector('.hero-content');
      if (content) {
        const rect = content.getBoundingClientRect();
        const scrollTo = window.scrollY + rect.top - 16;
        smoothScrollTo(scrollTo, 1100);
      } else {
        smoothScrollTo(window.scrollY + window.innerHeight * 0.6, 1100);
      }
    });
  }
});

// --- Автоскролл при первом скролле вниз на мобильных устройствах ---
(function() {
  let triggered = false;
  function onFirstScroll() {
    if (window.innerWidth > 767) return;
    if (triggered) return;
    if (window.scrollY > 10) return;
    triggered = true;
    const content = document.querySelector('.hero-content');
    if (content) {
      const rect = content.getBoundingClientRect();
      const scrollTo = window.scrollY + rect.top - 16;
      smoothScrollTo(scrollTo, 1100);
    } else {
      smoothScrollTo(window.scrollY + window.innerHeight * 0.6, 1100);
    }
    // После автоскролла убираем обработчик
    setTimeout(() => {
      window.removeEventListener('scroll', onFirstScroll);
    }, 1200);
  }
  window.addEventListener('scroll', onFirstScroll, { passive: true });
})();