/* script.js */

document.addEventListener('DOMContentLoaded', function() {
  // Настраиваемая длительность анимации (в миллисекундах)
  const fadeDuration = 1000;

  // Устанавливаем CSS-переменную для анимации
  document.documentElement.style.setProperty('--fade-block-duration', fadeDuration + 'ms');

  const fadeBlocks = [
    document.querySelector('.intro-section'),
    document.querySelector('.timeline'),
    document.querySelector('.info-section')
  ].filter(Boolean);

  function showAll() {
    fadeBlocks.forEach(block => block.classList.add('visible'));
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    fadeBlocks.forEach(block => observer.observe(block));

    // Если страница короткая (высота контента меньше окна) — показать сразу
    if (document.body.scrollHeight <= window.innerHeight + 20) {
      showAll();
    }
  } else {
    showAll();
  }
});