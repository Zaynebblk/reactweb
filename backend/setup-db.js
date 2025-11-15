const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log("Connection error:", err);
    return;
  }
  console.log("Connected to MySQL");

  // Créer la base de données
  db.query("CREATE DATABASE IF NOT EXISTS reactweb_db", (err) => {
    if (err) console.log("Error creating database:", err);
    else console.log("Database created or already exists");

    // Utiliser la base de données
    db.query("USE reactweb_db", (err) => {
      if (err) console.log("Error selecting database:", err);
      else console.log("Using reactweb_db");

      // Créer la table users
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      db.query(createTableQuery, (err) => {
        if (err) console.log("Error creating table:", err);
        else console.log("Table users created or already exists");

        // Insérer des données de test
        const insertQuery = "INSERT IGNORE INTO users (email, password) VALUES (?, ?)";
        db.query(insertQuery, ["test@example.com", "password123"], (err) => {
          if (err) console.log("Error inserting data:", err);
          else console.log("Test data inserted");

          // Afficher les utilisateurs
          db.query("SELECT * FROM users", (err, results) => {
            if (err) console.log("Error selecting users:", err);
            else {
              console.log("\n--- Users in database ---");
              console.table(results);
            }
            db.end();
          });
        });
      });
    });
  });
});
