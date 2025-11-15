const express = require('express');
const cors = require('cors');
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

const PORT = 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
