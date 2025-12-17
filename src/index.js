

function Menu(e) {
  const list = document.querySelector('nav > div > ul') || document.querySelector('nav ul');
  if (!list) return;

  // Toggle open/close
  const isOpen = e.name === 'menu';
  e.name = isOpen ? 'close' : 'menu';

  list.classList.toggle('top-[80px]', isOpen);
  list.classList.toggle('top-[-400px]', !isOpen);
  list.classList.toggle('opacity-100', isOpen);
}

// Collapse navbar when a link is clicked (mobile only)
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    const menuIcon = document.querySelector('ion-icon[name="close"]');
    const list = document.querySelector('nav > div > ul');
    if (menuIcon && list) {
      menuIcon.name = 'menu';
      list.classList.remove('top-[80px]', 'opacity-100');
      list.classList.add('top-[-400px]');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll behavior
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');
  const brandHeading = document.querySelector('nav h3');

  const handleScroll = () => {
    if (!nav) return;

    const scrolled = window.scrollY > 10;

    if (scrolled) {
      // When scrolling: solid light background
      nav.classList.remove('bg-transparent');
      nav.classList.add('bg-gray-50');

      navLinks.forEach(link => {
        link.classList.remove('text-gray-50');
        link.classList.add('text-slate-950');
      });

      if (brandHeading) {
        brandHeading.classList.remove('text-gray-50');
        brandHeading.classList.add('text-slate-950');
      }
    } else {
      // At top: transparent over hero
      nav.classList.add('bg-transparent');
      nav.classList.remove('bg-gray-50');

      navLinks.forEach(link => {
        link.classList.add('text-gray-50');
        link.classList.remove('text-slate-950');
      });

      if (brandHeading) {
        brandHeading.classList.add('text-gray-50');
        brandHeading.classList.remove('text-slate-950');
      }
    }
  };

  // Run once on load and then on scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll);

  // Contact form handling
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('button[type="submit"]');
  const formspreeURL = 'https://formspree.io/f/xgvpokpa'; // replace with your Formspree URL

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // stop page refresh

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const status = document.getElementById('form-status');

    try {
      const response = await fetch(formspreeURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // After successful send
            status.textContent = 'Message sent successfully!';
            status.classList.remove('hidden');
            status.classList.add('block');
            form.reset(); // clear inputs
      } else {
        alert('❌ Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert('⚠️ Network error, please check your connection.');
    }

    submitBtn.textContent = 'Submit';
    submitBtn.disabled = false;
  });
});

// import { Application } from '@splinetool/runtime';

// const canvas = document.getElementById('canvas3d');
// const app = new Application(canvas);
// app.load('https://prod.spline.design/NjQiOmC6aGguUAh1/scene.splinecode');
