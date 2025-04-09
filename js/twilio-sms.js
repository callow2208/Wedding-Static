
/**
 * Twilio SMS API integration for OTP verification
 * Simulates server-side functionality for demo purposes
 */

// Twilio credentials configuration - replace with your actual test credentials
const twilioConfig = {
  accountSid: 'ACec758aa9f42954eb19eff903c2b96816', // Replace with your Twilio Account SID
  authToken: '1a9e4f9eebddb3d63fbc35f613352699',   // Replace with your Twilio Auth Token
  phoneNumber: '19787652488' // Replace with your Twilio phone number
};

// Cache for storing generated OTPs (in a real implementation this would be server-side)
const otpCache = {};

/**
 * Generates a random OTP code
 * @returns {string} 6-digit OTP code
 */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Sends OTP via Twilio API
 * @param {string} phoneNumber - Recipient's phone number
 * @returns {Promise} - Promise that resolves with success or error message
 */
function sendOTP(phoneNumber) {
  return new Promise((resolve, reject) => {
    if (!phoneNumber || !/^\d{13}$/.test(phoneNumber)) {
      reject('Invalid phone number. Please enter a valid 13-digiit number.');
      return;
    }
    
    // Generate and store OTP
    const otp = generateOTP();
    otpCache[phoneNumber] = otp;
    
    // In a real implementation, this is where you would make an API call to Twilio
    // For demo purposes, we'll simulate a successful API call
    
    console.log(`Sending OTP: ${otp} to ${phoneNumber}`);
    
    // Simulate API delay
    setTimeout(() => {
      // For testing purposes, always return success
      // In production, this would depend on the actual Twilio API response
      resolve({
        success: true,
        message: `OTP sent successfully to +91${phoneNumber}`,
        // In a real implementation, you wouldn't return the OTP in the response
        // This is just for testing purposes
        otp: otp
      });
    }, 1000);
  });
}

/**
 * Verifies the OTP entered by the user
 * @param {string} phoneNumber - User's phone number
 * @param {string} userEnteredOTP - OTP entered by the user
 * @returns {Promise} - Promise that resolves with verification result
 */
function verifyOTP(phoneNumber, userEnteredOTP) {
  return new Promise((resolve, reject) => {
    if (!phoneNumber || !userEnteredOTP) {
      reject('Phone number and OTP are required');
      return;
    }
    
    const storedOTP = otpCache[phoneNumber];
    
    if (!storedOTP) {
      reject('OTP expired or not sent. Please request a new OTP.');
      return;
    }
    
    // Check if OTP matches
    if (storedOTP === userEnteredOTP) {
      // Clear OTP from cache after successful verification
      delete otpCache[phoneNumber];
      resolve({
        success: true,
        message: 'OTP verified successfully'
      });
    } else {
      resolve({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }
  });
}

// Export functions for use in form.js
window.twilioService = {
  sendOTP,
  verifyOTP
};
