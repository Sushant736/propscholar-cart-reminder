const nodemailer = require('nodemailer');

// Email configuration from environment variables
const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
};

const FROM_EMAIL = process.env.EMAIL_FROM || process.env.EMAIL_USER;

// Create reusable transporter
const transporter = nodemailer.createTransporter(EMAIL_CONFIG);

/**
 * Generates HTML email template for cart reminder
 * @param {Object} cart - Cart object with user and cart details
 * @returns {string} HTML email content
 */
function generateEmailTemplate(cart) {
  const { userName, userEmail, totalAmount, items } = cart;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .cta-button { display: inline-block; padding: 12px 30px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛒 Your PropScholar Cart is Waiting!</h1>
        </div>
        <div class="content">
          <p>Hi ${userName || 'Trader'},</p>
          <p>You left some items in your cart at PropScholar. Complete your purchase now and start your trading journey!</p>
          
          <h3>Your Cart Summary:</h3>
          <p><strong>Total:</strong> ${totalAmount ? `$${totalAmount}` : 'Available in cart'}</p>
          
          <a href="https://propscholar.com/cart" class="cta-button">
            Complete Your Purchase →
          </a>
          
          <p>Need help? Our support team is here for you 24/7.</p>
        </div>
        <div class="footer">
          <p>© 2025 PropScholar. All rights reserved.</p>
          <p>Trade smarter with affordable accounts starting at $5!</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Sends cart reminder email to user
 * @param {Object} cart - Cart object
 * @returns {Promise} Send mail result
 */
async function sendReminderEmail(cart) {
  try {
    const { userEmail, userName } = cart;
    
    if (!userEmail) {
      throw new Error('User email is required');
    }
    
    const mailOptions = {
      from: `PropScholar <${FROM_EMAIL}>`,
      to: userEmail,
      subject: '🛒 Your Cart is Waiting - Complete Your PropScholar Purchase!',
      html: generateEmailTemplate(cart)
    };
    
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Verify email transporter connection
 */
async function verifyConnection() {
  try {
    await transporter.verify();
    console.log('✅ Email service is ready to send emails');
  } catch (error) {
    console.error('❌ Email service connection failed:', error.message);
  }
}

module.exports = {
  sendReminderEmail,
  verifyConnection
};
