# 📧 PropScholar Cart Reminder System

Automated email reminder system that sends cart abandonment emails to users who have left items in their cart on PropScholar.

## 🚀 Features

- ✅ **Automated Cart Detection** - Identifies abandoned carts based on configurable time thresholds
- ✅ **Email Reminders** - Sends personalized cart reminder emails using Nodemailer
- ✅ **Flexible Integration** - Supports both API-based and direct database access
- ✅ **Scheduled Jobs** - Runs automatically using cron scheduling
- ✅ **Customizable Templates** - HTML email templates with PropScholar branding
- ✅ **Environment-Based Config** - Secure configuration through environment variables

## 📚 Tech Stack

- **Node.js** - Runtime environment
- **Nodemailer** - Email sending
- **node-cron** - Job scheduling
- **Axios** - HTTP requests (for API integration)
- **dotenv** - Environment variable management

## 💻 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Access to PropScholar database or API
- Email SMTP credentials (Gmail, SendGrid, etc.)

### Setup Steps

1. **Clone the repository:**
```bash
git clone https://github.com/Sushant736/propscholar-cart-reminder.git
cd propscholar-cart-reminder
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# API Configuration (if using API)
API_URL=https://api.propscholar.com
API_KEY=your_api_key_here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@propscholar.com

# Cron Schedule (runs every hour by default)
CRON_SCHEDULE=0 * * * *

# Cart Settings
ABANDONED_CART_THRESHOLD_HOURS=24
```

4. **Run the application:**
```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

## ⚙️ Configuration

### Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password as `EMAIL_PASSWORD` in your `.env`

### Cron Schedule Examples

```
# Every hour
0 * * * *

# Every 30 minutes
*/30 * * * *

# Every day at 9 AM
0 9 * * *

# Every 6 hours
0 */6 * * *
```

## 📁 Project Structure

```
propscholar-cart-reminder/
├── services/
│   ├── cartService.js      # Cart data fetching logic
│   └── emailService.js     # Email sending & templates
├── index.js                # Main entry point
├── package.json            # Dependencies
├── .env.example            # Environment template
└── README.md               # Documentation
```

## 👨‍💻 Development

### Local Testing

For local development, you can:

1. Comment out the cron schedule in `index.js`
2. Call `processAbandonedCarts()` directly for testing
3. Use a test email address to avoid spamming users

## 🚀 Deployment (Render)

### Option 1: Cron Job Service ($1/month)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Cron Job**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `propscholar-cart-reminder`
   - **Command:** `node index.js`
   - **Schedule:** `0 * * * *` (or your preferred schedule)
5. Add Environment Variables from your `.env`
6. Deploy!

### Option 2: Background Worker

1. Create a **Background Worker** on Render
2. Set the start command to `node index.js`
3. Add environment variables
4. Deploy

## 📦 API Integration

If you're using the PropScholar API, create an endpoint in your main API:

```javascript
// GET /api/abandoned-carts
// Returns abandoned carts based on threshold
```

Response format:
```json
{
  "carts": [
    {
      "id": "cart_123",
      "userEmail": "user@example.com",
      "userName": "John Doe",
      "totalAmount": 49.99,
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

## ✨ Email Template Preview

The system sends branded HTML emails with:
- Personalized greeting
- Cart summary
- Call-to-action button
- PropScholar branding

## 🛡️ Error Handling

- Failed emails are logged but don't stop the process
- Email service connection is verified on startup
- Graceful handling of API/database errors

## 📝 License

ISC

## 👤 Author

**PropScholar Team**

## 🐛 Issues

Found a bug? [Open an issue](https://github.com/Sushant736/propscholar-cart-reminder/issues)

---

**💡 Questions?** Contact PropScholar Support
