require('dotenv').config();
const cron = require('node-cron');
const { getAbandonedCarts } = require('./services/cartService');
const { sendReminderEmail } = require('./services/emailService');

// Cron schedule from env or default to every hour
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '0 * * * *';

console.log('🚀 PropScholar Cart Reminder System Started');
console.log(`📅 Scheduled to run: ${CRON_SCHEDULE}`);

// Main function to process abandoned carts
async function processAbandonedCarts() {
  try {
    console.log('\n🔍 Checking for abandoned carts...');
    const abandonedCarts = await getAbandonedCarts();
    
    if (abandonedCarts.length === 0) {
      console.log('✅ No abandoned carts found.');
      return;
    }
    
    console.log(`📧 Found ${abandonedCarts.length} abandoned cart(s). Sending reminders...`);
    
    for (const cart of abandonedCarts) {
      try {
        await sendReminderEmail(cart);
        console.log(`✅ Reminder sent to ${cart.userEmail}`);
      } catch (error) {
        console.error(`❌ Failed to send email to ${cart.userEmail}:`, error.message);
      }
    }
    
    console.log('✅ Cart reminder process completed.');
  } catch (error) {
    console.error('❌ Error processing abandoned carts:', error);
  }
}

// Schedule the cron job
cron.schedule(CRON_SCHEDULE, processAbandonedCarts);

// Run immediately on startup (optional - comment out if you don't want this)
processAbandonedCarts();

console.log('✅ Cron job scheduled successfully!');
