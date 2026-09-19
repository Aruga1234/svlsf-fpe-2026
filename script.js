/* ========================================
   Sri Vara Laxmi Sridhar Foundation
   Fellowship in Professional Excellence
   External JavaScript
======================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Active Navigation Link on Scroll ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function setActiveNav() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav(); // Run once on load


  // ---------- Navbar Shrink on Scroll ----------
  const navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();


  // ---------- Back to Top Button ----------
  const backToTopBtn = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  // ---------- Smooth Close Mobile Menu on Link Click ----------
  const navToggler = document.querySelector('.navbar-toggler');
  const navCollapse = document.querySelector('#mainNav');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Close mobile menu after clicking a link
      if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });


  // ---------- Enquiry Form Handling ----------
  const enquiryForm = document.getElementById('enquiryForm');
  const formMessage = document.getElementById('formMessage');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const institution = document.getElementById('institutionName').value.trim();
      const contactPerson = document.getElementById('contactPerson').value.trim();
      const email = document.getElementById('officialEmail').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic validation
      if (!institution || !contactPerson || !email) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Simple email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate form submission (replace with actual backend later)
      showFormMessage('Thank you! Your enquiry has been received. We will contact you shortly.', 'success');
      enquiryForm.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    });
  }

  function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = type; // 'success' or 'error'
    formMessage.style.display = 'block';
  }


  // ---------- Fade-in Animation on Scroll (Optional Enhancement) ----------
  const animatedElements = document.querySelectorAll('.info-card, .category-card, .process-step');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});