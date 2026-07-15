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
// Registration form -> Formspree
const registrationForm = document.querySelector('#registration-form');
const formMessage = document.querySelector('#form-message');
const submitButton = registrationForm?.querySelector('.submit-btn');

registrationForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  formMessage?.classList.remove('is-success', 'is-error');

  if (!registrationForm.checkValidity()) {
    registrationForm.reportValidity();

    if (formMessage) {
      formMessage.textContent =
        'Zəhmət olmasa bütün məcburi xanaları düzgün doldurun.';
      formMessage.classList.add('is-error');
    }

    return;
  }

  const formData = new FormData(registrationForm);
  const originalButtonContent = submitButton?.innerHTML;

  formData.append('_subject', 'RİMA — Yeni kurs müraciəti');
  formData.append('_replyto', formData.get('email'));

  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML =
        'Göndərilir... <span aria-hidden="true">↗</span>';
    }

    if (formMessage) {
      formMessage.textContent = 'Müraciətiniz göndərilir...';
    }

    const response = await fetch(registrationForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Form göndərilmədi');
    }

    if (formMessage) {
      formMessage.textContent =
        'Müraciətiniz uğurla göndərildi. Tezliklə sizinlə əlaqə saxlanılacaq.';
      formMessage.classList.add('is-success');
    }

    registrationForm.reset();

    if (selectedCourseInput) {
      selectedCourseInput.value = 'RİMA Full Academy';
    }

    if (selectedCourseName) {
      selectedCourseName.textContent = 'RİMA Full Academy';
    }
  } catch (error) {
    console.error(error);

    if (formMessage) {
      formMessage.textContent =
        'Müraciət göndərilmədi. Zəhmət olmasa yenidən cəhd edin.';
      formMessage.classList.add('is-error');
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML =
        originalButtonContent ||
        'Müraciəti göndər <span aria-hidden="true">↗</span>';
    }
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
