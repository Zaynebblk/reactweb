const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

// Middleware
app.use(cors()); // Permet les requêtes depuis le frontend
app.use(express.json()); // Pour lire le body JSON

// Signup : ajouter un utilisateur
app.post('/signup', (req, res) => {
  const { email, motdepasse } = req.body;
  const sql = 'INSERT INTO users (email, motdepasse) VALUES (?, ?)';
  db.query(sql, [email, motdepasse], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Utilisateur ajouté !');
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
