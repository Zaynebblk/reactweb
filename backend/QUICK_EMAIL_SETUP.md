# Quick Email Testing Setup (No Gmail Required!)

## Use Mailtrap for Instant Testing

Mailtrap is a FREE email testing service - perfect for development!

### Step 1: Sign Up (30 seconds)
1. Go to https://mailtrap.io
2. Click "Sign Up" - use Google/GitHub or email
3. Create a free account (no credit card needed)

### Step 2: Get Credentials (10 seconds)
1. After login, you'll see an inbox
2. Click on the inbox name
3. Find the "SMTP Settings" section
4. You'll see something like:
   ```
   Host: smtp.mailtrap.io
   Port: 2525
   Username: 1a2b3c4d5e6f7g
   Password: 1a2b3c4d5e6f7g
   ```

### Step 3: Update Code (2 minutes)

Open `backend/server.js` and find the email transporter configuration (around line 95).

**Replace this:**
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});
```

**With this:**
```javascript
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "YOUR_MAILTRAP_USERNAME", // from Step 2
    pass: "YOUR_MAILTRAP_PASSWORD"  // from Step 2
  }
});
```

### Step 4: Restart Server
```bash
# Stop current server (Ctrl+C)
cd backend
node server.js
```

### Step 5: Test!
1. Go to your app
2. Create an invoice
3. Click "Send Email"
4. Check your Mailtrap inbox - the email will appear there!

## Why Mailtrap?
✅ **No real email needed** - all emails are caught by Mailtrap  
✅ **Instant setup** - no app passwords or 2FA  
✅ **Perfect for testing** - see exactly what your clients will receive  
✅ **100% FREE** - unlimited emails in the free tier  

## Alternative: Gmail (For Production)
See `CONFIGURE_EMAIL.md` for Gmail setup (requires App Password)

## Need Help?
- Check the backend console for detailed error messages
- Make sure to restart the server after changes
- Verify your Mailtrap credentials are correct
