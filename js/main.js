
// Main JavaScript file for WeddingSreni

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Add scrolled class to navbar on scroll
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    });
  }
  
  // Close mobile menu when a nav item is clicked
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navLinks && navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        }
      });
    });
  }
  
  // Add CSS class if browser is mobile
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add('mobile-device');
  }
  
  // Add styles for OTP input fields if they don't exist yet
  if (!document.getElementById('otp-styles')) {
    const otpStyles = document.createElement('style');
    otpStyles.id = 'otp-styles';
    otpStyles.textContent = `
      .otp-digit {
        width: 40px;
        text-align: center;
        font-size: 1.2rem;
        padding: 6px 0;
      }
      .btn-gold {
        background-color: #D4AF37;
        border-color: #D4AF37;
        color: white;
      }
      .btn-gold:hover {
        background-color: #C5A028;
        border-color: #C5A028;
        color: white;
      }
      .btn-gold:disabled {
        background-color: #D4AF37;
        border-color: #D4AF37;
        opacity: 0.65;
      }
    `;
    document.head.appendChild(otpStyles);
  }
});
