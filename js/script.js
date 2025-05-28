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
      window.scrollBy({ top: window.innerHeight * 0.6, behavior: 'smooth' });
    });
  }
});