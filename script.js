// ============================================================
//  Polished Beauty — script.js
//  Web Programming 
// ============================================================

// ---------- MOBILE HAMBURGER MENU ----------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ---------- STICKY NAVBAR SHADOW ----------
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(153,53,86,0.10)'
      : 'none';
  }
});

// ---------- ADD TO CART ----------
let cartCount = 0;

function addToCart(productName, price) {
  cartCount++;
  const toast = document.getElementById('cartToast');
  if (toast) {
    toast.textContent = `✓ ${productName} added to cart! (৳${price})`;
    toast.style.display = 'block';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.display = 'none';
    }, 2800);
  }
}

// ---------- BOOKING FORM (CLIENT-SIDE VALIDATION) ----------
const bookingForm = document.getElementById('bookingForm');
const formMsg     = document.getElementById('formMsg');

if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {

    const fname   = document.getElementById('fname').value.trim();
    const lname   = document.getElementById('lname').value.trim();
    const service = document.getElementById('service').value;
    const date    = document.getElementById('date').value;
    const phone   = document.getElementById('phone').value.trim();

    // Basic validation
    if (!fname || !lname || !service || !date || !phone) {
      e.preventDefault();
      showMsg('Please fill in all fields before confirming.', 'error');
      return;
    }

    // Phone format check (Bangladesh: starts with +880 or 01, min 11 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      e.preventDefault();
      showMsg('Please enter a valid Bangladeshi phone number.', 'error');
      return;
    }

    // Date must be today or in the future
    const selected  = new Date(date);
    const today     = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      e.preventDefault();
      showMsg('Please select today or a future date.', 'error');
      return;
    }

    // If PHP is not available, intercept and show success message
    // Comment out the next 5 lines if you have a running PHP server
    e.preventDefault();
    showMsg(
      `Thank you, ${fname}! Your appointment for "${service}" has been received. We will confirm via phone.`,
      'success'
    );
    bookingForm.reset();
  });
}

function showMsg(text, type) {
  if (!formMsg) return;
  formMsg.textContent = text;
  formMsg.className   = 'form-msg ' + type;
  formMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---------- SCROLL-IN ANIMATION FOR CARDS ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.service-card, .product-card, .testimonial').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// ---------- ACTIVE NAV LINK HIGHLIGHT ----------
const sections  = document.querySelectorAll('section[id], div[id]');
const navItems  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? '#993556'
      : '';
  });
});
