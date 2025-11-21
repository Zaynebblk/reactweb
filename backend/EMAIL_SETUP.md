# Email Configuration Guide

## Gmail Setup (Recommended)

To enable email sending functionality, you need to configure Gmail credentials in the `.env` file.

### Step 1: Create a Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left menu
3. Enable **2-Step Verification** (if not already enabled)
4. After enabling 2FA, go back to Security
5. Click on **App passwords** (under "Signing in to Google")
6. Select **Mail** and **Other (Custom name)**
7. Enter "TechnoZone" as the app name
8. Click **Generate**
9. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 2: Update the .env File

Open the `backend/.env` file and update:

```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

Replace:
- `your-actual-email@gmail.com` with your Gmail address
- `abcd efgh ijkl mnop` with the app password you generated

### Step 3: Save and Restart the Server

After updating `.env`, restart the backend server:

```bash
cd backend
node server.js
```

## Alternative: Other Email Services

### Using Outlook/Hotmail

```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### Using Custom SMTP

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.your-domain.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Testing

1. Create an invoice in the application
2. Click the "Send Email" button
3. Check if the email was received at the client's email address
4. Check the console for any errors if email fails to send

## Troubleshooting

### Error: "Invalid login"
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2FA is enabled on your Google account

### Error: "Connection timeout"
- Check your internet connection
- Some networks block SMTP ports - try a different network

### Email not received
- Check the spam/junk folder
- Verify the client email address is correct
- Check backend console for error messages

## Security Notes

⚠️ **Important:**
- Never commit `.env` file to Git
- Keep your App Password secure
- Use environment variables for production
- Consider using a dedicated email service for production (SendGrid, AWS SES, etc.)
