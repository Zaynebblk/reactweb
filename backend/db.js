require('dotenv').config();
const mysql = require('mysql2');

// Création de la connexion
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'web_bdd'
});

// Connexion
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion: ', err);
    return;
  }
  console.log('Connecté à la base MySQL !');
});

module.exports = connection;
