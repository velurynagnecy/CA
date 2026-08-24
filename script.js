const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const header = document.querySelector('.site-header');
const form = document.getElementById('appointmentForm');
const formNote = document.getElementById('formNote');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.style.display = expanded ? 'none' : 'flex';
    mainNav.style.flexDirection = 'column';
    mainNav.style.position = 'absolute';
    mainNav.style.top = '78px';
    mainNav.style.left = '16px';
    mainNav.style.right = '16px';
    mainNav.style.padding = '1rem';
    mainNav.style.background = 'rgba(245, 240, 232, 0.96)';
    mainNav.style.border = '1px solid rgba(23, 23, 22, 0.08)';
    mainNav.style.borderRadius = '16px';
    mainNav.style.boxShadow = '0 12px 32px rgba(18,17,16,0.08)';
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) {
      mainNav.removeAttribute('style');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 12);
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const treatment = (formData.get('treatment') || '').toString().trim();
    const date = (formData.get('date') || '').toString();
    const time = (formData.get('time') || '').toString();

    const message = [
      'Demo enquiry:',
      `Name: ${name || 'Not provided'}`,
      `Treatment: ${treatment || 'Not provided'}`,
      `Preferred date: ${date || 'Not provided'}`,
      `Preferred time: ${time || 'Not provided'}`
    ].join('\n');

    formNote.textContent = `Demo request captured. Connect this form to WhatsApp or email later.\n${message}`;
    form.reset();
  });
}
