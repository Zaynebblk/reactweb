# Email Configuration Instructions

## ⚠️ Important: The email feature requires proper configuration

Currently, the `.env` file has placeholder values. To enable email sending:

## Option 1: Use Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication on your Gmail account**
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate an App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "TechnoZone" as the app name
   - Copy the 16-character password

3. **Update the `.env` file:**
   ```env
   EMAIL_USER=your-real-email@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   ```

4. **Restart the backend server**

## Option 2: Use Mailtrap (For Testing Without Real Emails)

Mailtrap is a fake SMTP service perfect for testing:

1. **Sign up at https://mailtrap.io (FREE)**

2. **Get your SMTP credentials from the inbox settings**

3. **Update `server.js`** (around line 95):
   ```javascript
   const transporter = nodemailer.createTransport({
     host: "smtp.mailtrap.io",
     port: 2525,
     auth: {
       user: "your-mailtrap-username",
       pass: "your-mailtrap-password"
     }
   });
   ```

## Option 3: Skip Email Configuration (Use Print Only)

If you don't want to configure email right now:
- Simply use the "Print" button to save invoices as PDF
- Email functionality will show an error but won't break the app

## Testing

After configuration, test by:
1. Creating an invoice
2. Clicking "Send Email"
3. Check the console for detailed logs
4. Verify email was received (or check Mailtrap inbox)

## Troubleshooting

### Error: "Invalid login"
- You're using your regular Gmail password instead of App Password
- Solution: Generate an App Password as described above

### Error: "Connection timeout"
- Your network may be blocking SMTP
- Solution: Try a different network or use Mailtrap

### Error: "Missing credentials"
- `.env` file not configured
- Solution: Update EMAIL_USER and EMAIL_PASS in `.env`

### Backend logs show: "EMAIL_USER: your-email@gmail.com"
- `.env` file not loaded or has placeholder values
- Solution: Update `.env` with real credentials and restart server

## Security Note

🔒 **Never commit real credentials to Git!**
- The `.env` file should be in `.gitignore`
- Use environment variables in production
