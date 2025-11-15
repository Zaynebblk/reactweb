require('dotenv').config();
const db = require('./db');

console.log('Vérification des utilisateurs...\n');

db.query('SELECT id, nom, prenom, email, motdepasse FROM users', (err, results) => {
  if (err) {
    console.error('Erreur:', err);
    db.end();
    return;
  }
  
  console.log('Utilisateurs dans la base de données:');
  console.table(results);
  
  console.log(`\nTotal: ${results.length} utilisateur(s)`);
  
  db.end();
});
