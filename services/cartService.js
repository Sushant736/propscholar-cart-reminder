const axios = require('axios');

// Configuration
const ABANDONED_CART_THRESHOLD_HOURS = parseInt(process.env.ABANDONED_CART_THRESHOLD_HOURS) || 24;
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

/**
 * Fetches abandoned carts from PropScholar API
 * @returns {Array} Array of abandoned cart objects
 */
async function getAbandonedCarts() {
  try {
    // Option 1: Fetch from API endpoint
    if (API_URL && API_KEY) {
      const response = await axios.get(`${API_URL}/abandoned-carts`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: {
          thresholdHours: ABANDONED_CART_THRESHOLD_HOURS
        }
      });
      
      return response.data.carts || [];
    }
    
    // Option 2: Direct database query (if you use this, uncomment and configure DB)
    // const db = require('../config/database');
    // const query = `
    //   SELECT c.id, c.user_id, u.email as userEmail, u.name as userName, 
    //          c.created_at, c.total_amount, c.items
    //   FROM carts c
    //   JOIN users u ON c.user_id = u.id
    //   WHERE c.status = 'pending'
    //     AND c.created_at < NOW() - INTERVAL '${ABANDONED_CART_THRESHOLD_HOURS} hours'
    //     AND c.reminder_sent = false
    // `;
    // const result = await db.query(query);
    // return result.rows;
    
    console.warn('⚠️ No API URL or database configured. Returning empty array.');
    return [];
  } catch (error) {
    console.error('Error fetching abandoned carts:', error.message);
    throw error;
  }
}

/**
 * Marks a cart as "reminder sent" to avoid sending duplicate emails
 * @param {string} cartId - The cart ID
 */
async function markReminderSent(cartId) {
  try {
    if (API_URL && API_KEY) {
      await axios.post(`${API_URL}/carts/${cartId}/mark-reminder-sent`, {}, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Cart ${cartId} marked as reminder sent`);
    }
    
    // If using direct DB:
    // const db = require('../config/database');
    // await db.query('UPDATE carts SET reminder_sent = true WHERE id = $1', [cartId]);
  } catch (error) {
    console.error(`Error marking cart ${cartId} as reminder sent:`, error.message);
  }
}

module.exports = {
  getAbandonedCarts,
  markReminderSent
};
