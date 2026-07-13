const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-menu');
const menuLinks = document.querySelectorAll('.main-menu a');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  setMenu(open);
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  const icon = button?.querySelector('b');

  button?.addEventListener('click', () => {
    const willOpen = !item.classList.contains('is-open');

    faqItems.forEach((otherItem) => {
      otherItem.classList.remove('is-open');
      const otherButton = otherItem.querySelector('.faq-question');
      const otherIcon = otherButton?.querySelector('b');
      otherButton?.setAttribute('aria-expanded', 'false');
      if (otherIcon) otherIcon.textContent = '+';
    });

    if (willOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      if (icon) icon.textContent = '−';
    }
  });
});

// Pricing selection -> registration form
const courseButtons = document.querySelectorAll('.choose-course');
const selectedCourseInput = document.querySelector('#selected-course');
const selectedCourseName = document.querySelector('#selected-program-name');

courseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const course = button.dataset.course || 'RİMA Full Academy';
    if (selectedCourseInput) selectedCourseInput.value = course;
    if (selectedCourseName) selectedCourseName.textContent = course;
  });
});

// Registration form. Default mode opens the visitor's e-mail application.
// config.js daxilində contactEmail sahəsini dəyişməklə müraciətlər real ünvana yönləndirilir.
const registrationForm = document.querySelector('#registration-form');
const formMessage = document.querySelector('#form-message');

registrationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage?.classList.remove('is-success', 'is-error');

  if (!registrationForm.checkValidity()) {
    registrationForm.reportValidity();
    if (formMessage) {
      formMessage.textContent = 'Zəhmət olmasa bütün məcburi xanaları düzgün doldurun.';
      formMessage.classList.add('is-error');
    }
    return;
  }

  const data = new FormData(registrationForm);
  const config = window.RIMA_CONFIG || {};
  const recipient = String(config.contactEmail || '').trim();
  const subject = String(config.formSubject || 'RİMA — Yeni kurs müraciəti');
  const body = [
    'RİMA saytından yeni müraciət',
    '',
    `Proqram: ${data.get('course')}`,
    `Ad və soyad: ${data.get('name')}`,
    `E-mail: ${data.get('email')}`,
    `Telefon: ${data.get('phone')}`,
    `Təhsil səviyyəsi: ${data.get('education')}`
  ].join('\n');

  if (!recipient || recipient === 'email@example.com') {
    navigator.clipboard?.writeText(body).catch(() => {});
    if (formMessage) {
      formMessage.textContent = 'Forma işləyir. Real müraciətlər üçün config.js faylında contactEmail ünvanını dəyişin. Məlumatlar mübadilə buferinə köçürüldü.';
      formMessage.classList.add('is-success');
    }
    return;
  }

  const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  if (formMessage) {
    formMessage.textContent = 'E-mail tətbiqiniz açılır. Müraciəti göndərmək üçün Send düyməsini sıxın.';
    formMessage.classList.add('is-success');
  }
});

// External footer links from config.js
const cfg = window.RIMA_CONFIG || {};
document.querySelectorAll('[data-config-link]').forEach((link) => {
  const key = link.dataset.configLink;
  const value = cfg[key];
  if (!value || value === '#') return;
  link.href = key === 'contactEmail' ? `mailto:${value}` : value;
});

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();
