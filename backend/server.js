const express = require("express");
const mysql = require("mysql2"); // <- this is your MySQL library
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "reactuser",
  password: "ReactPass123!",
  database: "reactweb_db",
});

// Connect to MySQL
db.connect((err) => {
  if (err) console.log("DB connection error:", err);
  else console.log("Connected to MySQL database");
});

// ✅ Use 'db', not 'sql' here
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length > 0) res.json({ success: true, message: "Login successful", user: results[0] });
      else res.json({ success: false, message: "Invalid email or password" });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
