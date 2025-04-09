
// Form handling JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Common form submission handler
  const setupFormSubmission = (formId) => {
    const form = document.getElementById(formId);
    
    if (form) {
      // Add phone verification
      addPhoneVerification(form);
      
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if phone verification is required and completed
        const phoneInput = this.querySelector('input[type="tel"]');
        if (phoneInput && phoneInput.hasAttribute('data-verification-required')) {
          if (phoneInput.getAttribute('data-verified') !== 'true') {
            showAlert('danger', 'Please verify your phone number before submitting');
            return;
          }
        }
        
        // Show loading state on submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Sending...
        `;
        
        // In a real implementation, you would connect to your SMS API here
        // For demonstration, we'll use a simulated form submission
        
        // Simulate form submission (replace this with your actual form submission code)
        setTimeout(function() {
          // Show success message
          showAlert('success', 'Thank you! Your message has been sent successfully.');
          
          // Reset form
          form.reset();
          
          // Reset phone verification if it exists
          const phoneVerificationDiv = form.querySelector('.phone-verification-container');
          if (phoneVerificationDiv) {
            phoneVerificationDiv.innerHTML = '';
          }
          
          // Reset phone input verified state
          if (phoneInput) {
            phoneInput.removeAttribute('data-verified');
            phoneInput.disabled = false;
            phoneInput.classList.remove('is-valid', 'border-success');
            
            // Reset verification badge if exists
            const verificationBadge = form.querySelector('.verification-badge');
            if (verificationBadge) {
              verificationBadge.remove();
            }
            
            // Reset get OTP button
            const getOtpBtn = form.querySelector('.get-otp-btn');
            if (getOtpBtn) {
              getOtpBtn.style.display = '';
              getOtpBtn.disabled = false;
            }
          }
          
          // Reset button
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }, 1500);
      });
    }
  };
  
  // Add phone verification functionality
  const addPhoneVerification = (form) => {
    const phoneInput = form.querySelector('input[type="tel"]');
    if (!phoneInput) return;
    
    // Mark this phone input as requiring verification
    phoneInput.setAttribute('data-verification-required', 'true');
    
    // Create container for verification components
    const phoneInputParent = phoneInput.parentElement;
    
    // Convert to input group if not already
    if (!phoneInputParent.classList.contains('input-group')) {
      const inputGroup = document.createElement('div');
      inputGroup.className = 'input-group';
      phoneInput.parentNode.insertBefore(inputGroup, phoneInput);
      inputGroup.appendChild(phoneInput);
    }
    
    // Add get OTP button
    const getOtpBtn = document.createElement('button');
    getOtpBtn.type = 'button';
    getOtpBtn.className = 'btn btn-gold get-otp-btn';
    getOtpBtn.innerText = 'Get OTP';
    phoneInputParent.appendChild(getOtpBtn);
    
    // Add verification container after the input group
    const verificationContainer = document.createElement('div');
    verificationContainer.className = 'phone-verification-container mt-2';
    phoneInputParent.parentNode.insertBefore(verificationContainer, phoneInputParent.nextSibling);
    
    // Handle OTP request
    getOtpBtn.addEventListener('click', function() {
      const phoneNumber = phoneInput.value;
      
      // Simple validation
      if (!phoneNumber) {
        showAlert('danger', 'Please enter a phone number');
        return;
      }
      
      if (!/^\d{10}$/.test(phoneNumber)) {
        showAlert('danger', 'Please enter a valid 13-digit phone number');
        return;
      }
      
      // Disable button and show loading
      getOtpBtn.disabled = true;
      getOtpBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Sending...
      `;
      
      // In a real implementation, you would connect to your SMS API here to send the OTP
      // For demonstration, we'll use a simulated OTP sending
      
      // Simulate OTP sending (replace with your actual API call)
      setTimeout(() => {
        // Show OTP verification UI
        verificationContainer.innerHTML = `
          <div class="card card-body bg-light mb-3">
            <label for="otp-input" class="form-label mb-2">Enter OTP sent to your phone</label>
            <div class="d-flex gap-1 mb-2">
              <input type="text" class="form-control otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
              <input type="text" class="form-control otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
              <input type="text" class="form-control otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
              <input type="text" class="form-control otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
              <input type="text" class="form-control otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
              <input type="text" class="form-control otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
            </div>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-gold flex-grow-1 verify-otp-btn">Verify OTP</button>
              <button type="button" class="btn btn-outline-secondary resend-otp-btn">Resend</button>
            </div>
          </div>
        `;
        
        // Setup OTP inputs for better UX
        setupOtpInputs(verificationContainer);
        
        // Reset get OTP button
        getOtpBtn.disabled = false;
        getOtpBtn.innerText = 'Get OTP';
        
        // Show success message
        showAlert('success', 'OTP sent to your phone number');
        
        // Handle OTP verification
        const verifyOtpBtn = verificationContainer.querySelector('.verify-otp-btn');
        verifyOtpBtn.addEventListener('click', function() {
          const otpInputs = verificationContainer.querySelectorAll('.otp-digit');
          let otpValue = '';
          otpInputs.forEach(input => {
            otpValue += input.value;
          });
          
          if (!otpValue || otpValue.length !== 6) {
            showAlert('danger', 'Please enter a valid 6-digit OTP');
            return;
          }
          
          // Disable verify button and show loading
          verifyOtpBtn.disabled = true;
          verifyOtpBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Verifying...
          `;
          
          // In a real implementation, you would connect to your SMS API here to verify the OTP
          // For demonstration, we'll use a simulated OTP verification
          
          // Simulate OTP verification (replace with your actual verification logic)
          setTimeout(() => {
            // For demo purposes, we'll consider 123456 as valid OTP
            // In production, you would validate this against the OTP sent to the user's phone
            if (otpValue === '123456') {
              // Mark phone as verified
              phoneInput.setAttribute('data-verified', 'true');
              phoneInput.disabled = true;
              phoneInput.classList.add('is-valid', 'border-success');
              
              // Add verification badge
              const badge = document.createElement('span');
              badge.className = 'verification-badge ms-2 badge bg-success';
              badge.innerHTML = '<i class="fas fa-check me-1"></i> Verified';
              phoneInputParent.appendChild(badge);
              
              // Hide get OTP button
              getOtpBtn.style.display = 'none';
              
              // Clear verification UI
              verificationContainer.innerHTML = '';
              
              // Show success message
              showAlert('success', 'Phone number verified successfully!');
            } else {
              // Reset verify button
              verifyOtpBtn.disabled = false;
              verifyOtpBtn.innerText = 'Verify OTP';
              
              // Show error message
              showAlert('danger', 'Invalid OTP. Please try again.');
            }
          }, 1500);
        });
        
        // Handle resend OTP
        const resendBtn = verificationContainer.querySelector('.resend-otp-btn');
        resendBtn.addEventListener('click', function() {
          getOtpBtn.click();
        });
      }, 1500);
    });
  };
  
  // Setup OTP input fields for better UX
  const setupOtpInputs = (container) => {
    const inputs = container.querySelectorAll('.otp-digit');
    
    inputs.forEach((input, index) => {
      // Auto focus first input
      if (index === 0) {
        setTimeout(() => input.focus(), 100);
      }
      
      // Handle key inputs
      input.addEventListener('keydown', function(e) {
        // Allow only numbers, backspace, delete, arrows and tab
        if (
          !(
            (e.keyCode >= 48 && e.keyCode <= 57) || // Numbers
            (e.keyCode >= 96 && e.keyCode <= 105) || // Numpad
            e.keyCode === 8 || // Backspace
            e.keyCode === 46 || // Delete
            e.keyCode === 37 || // Left arrow
            e.keyCode === 39 || // Right arrow
            e.keyCode === 9 // Tab
          )
        ) {
          e.preventDefault();
        }
      });
      
      input.addEventListener('input', function() {
        // Move to next input when a number is entered
        if (this.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
      
      input.addEventListener('keyup', function(e) {
        // Move to previous input when backspace is pressed and input is empty
        if ((e.keyCode === 8 || e.keyCode === 46) && !this.value && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });
  };
  
  // Setup alert function to show notifications
  const showAlert = (type, message) => {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show fixed-top m-3 mx-auto`;
    alertDiv.style.maxWidth = '500px';
    alertDiv.style.left = '0';
    alertDiv.style.right = '0';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add to DOM
    document.body.appendChild(alertDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
      const bsAlert = new bootstrap.Alert(alertDiv);
      bsAlert.close();
    }, 5000);
  };
  
  // Setup all forms on the website
  setupFormSubmission('enquiryForm');
  setupFormSubmission('contactForm');
  setupFormSubmission('venueEnquiryForm');

  // Add any other forms that need phone verification here
  const allForms = document.querySelectorAll('form');
  allForms.forEach(form => {
    if (form.id && !['enquiryForm', 'contactForm', 'venueEnquiryForm'].includes(form.id)) {
      // Check if the form has a phone input
      const hasPhoneInput = form.querySelector('input[type="tel"]');
      if (hasPhoneInput) {
        setupFormSubmission(form.id);
      }
    }
  });
  
});
