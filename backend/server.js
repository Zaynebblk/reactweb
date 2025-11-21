const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const db = require('./db');

// Middleware
app.use(cors()); // Permet les requêtes depuis le frontend
app.use(express.json()); // Pour lire le body JSON

// Signup : ajouter un utilisateur
app.post('/signup', (req, res) => {
  const { nom, prenom, email, motdepasse } = req.body;
  
  if (!email || !motdepasse) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });
  }

  // Vérifier si l'email existe déjà
  const checkSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkSql, [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification:', err);
      return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }

    if (results.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'Il y a déjà un compte avec cet email' 
      });
    }

    // Insérer le nouvel utilisateur
    const insertSql = 'INSERT INTO users (nom, prenom, email, motdepasse) VALUES (?, ?, ?, ?)';
    db.query(insertSql, [nom, prenom, email, motdepasse], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'inscription:', err);
        return res.status(500).json({ success: false, message: 'Erreur serveur' });
      }
      res.json({ 
        success: true, 
        message: 'Inscription réussie !',
        userId: result.insertId 
      });
    });
  });
});

// Login : vérifier l'utilisateur
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });
  }

  const sql = 'SELECT * FROM users WHERE email = ? AND motdepasse = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la connexion:', err);
      return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
    
    if (results.length > 0) {
      res.json({ 
        success: true, 
        message: 'Connexion réussie !',
        user: { email: results[0].email }
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: 'Email ou mot de passe incorrect' 
      });
    }
  });
});

// Send Invoice Email
app.post('/send-invoice', async (req, res) => {
  const { clientEmail, clientName, invoiceNumber, date, products, total, totalHT, tva, remise } = req.body;

  console.log('📧 Attempting to send email to:', clientEmail);
  console.log('📧 Email User:', process.env.EMAIL_USER);
  console.log('📧 Email Pass configured:', !!process.env.EMAIL_PASS);

  // Validation
  if (!clientEmail || !clientName) {
    return res.status(400).json({ 
      success: false, 
      message: 'Client email and name are required' 
    });
  }

  // Configuration du transporteur email (Gmail example)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });

  // Créer le contenu HTML de l'email
  const productsHTML = products.map(p => `
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">${p.nom}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${p.prix.toFixed(3)} DT</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${p.quantite}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${(p.prix * p.quantite).toFixed(3)} DT</td>
    </tr>
  `).join('');

  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4062c0, #23237d); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #4062c0; color: white; padding: 10px; text-align: left; }
        .totals { margin-top: 20px; text-align: right; }
        .total-row { padding: 5px 0; }
        .grand-total { font-size: 18px; font-weight: bold; color: #4062c0; }
        .footer { text-align: center; margin-top: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>TECHNOZONE</h1>
          <h2>Invoice #${invoiceNumber}</h2>
        </div>
        <div class="content">
          <p><strong>Dear ${clientName},</strong></p>
          <p>Thank you for your purchase! Please find below the details of your invoice.</p>
          
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
          
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${productsHTML}
            </tbody>
          </table>
          
          <div class="totals">
            <div class="total-row">Total Excl. Tax: ${totalHT.toFixed(2)} DT</div>
            <div class="total-row">VAT (20%): ${tva.toFixed(2)} DT</div>
            <div class="total-row">Discount: ${remise.toFixed(2)} DT</div>
            <div class="total-row grand-total">Total Incl. Tax: ${total.toFixed(2)} DT</div>
          </div>
          
          <p style="margin-top: 30px;">Thank you for your trust!</p>
        </div>
        <div class="footer">
          <p>TechnoZone - Founded 2025</p>
          <p>24/7 Support: contact@technozone.tn</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || 'TechnoZone <your-email@gmail.com>',
    to: clientEmail,
    subject: `Invoice #${invoiceNumber} - TechnoZone`,
    html: emailHTML
  };

  try {
    console.log('📧 Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    res.json({ success: true, message: 'Invoice sent successfully!', messageId: info.messageId });
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email', 
      error: error.message,
      details: error.code || 'Unknown error'
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  
  // Email configuration check
  const emailConfigured = process.env.EMAIL_USER && 
                         process.env.EMAIL_PASS && 
                         process.env.EMAIL_USER !== 'your-email@gmail.com';
  
  console.log('\n📧 Email Configuration Status:');
  if (emailConfigured) {
    console.log('✅ Email is configured and ready!');
    console.log(`   Using: ${process.env.EMAIL_USER}`);
  } else {
    console.log('⚠️  Email is NOT configured!');
    console.log('   Email User:', process.env.EMAIL_USER || 'NOT SET');
    console.log('   Email Pass:', process.env.EMAIL_PASS ? 'SET (hidden)' : 'NOT SET');
    console.log('\n💡 To enable email sending:');
    console.log('   1. Open backend/.env file');
    console.log('   2. Replace EMAIL_USER with your Gmail address');
    console.log('   3. Replace EMAIL_PASS with your Gmail App Password');
    console.log('   4. Restart this server');
    console.log('   📖 See CONFIGURE_EMAIL.md for detailed instructions\n');
  }
});
