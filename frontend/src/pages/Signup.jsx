
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

function Signup() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          motdepasse: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("✅ Inscription réussie ! Votre compte a été créé avec succès. Redirection vers la page de connexion...");
        // Réinitialiser le formulaire
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="src\imgs\logo.png" alt="logo" width="130" height="130" />
          <h1>TechnoZone</h1>
        </div>
        <ul>
          <li>
            <Link to="/Entreprise">Home</Link>
          </li>
          <li>
            <Link to="/Article">Article</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <a href="/Contact" className="btn">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>

      {/* Main container */}
      <div className="container">
        
        
        <div className="right-panel">
          <h2>Sign Up</h2>
          
          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '12px',
              borderRadius: '5px',
              marginBottom: '15px',
              border: '2px solid #ef5350'
            }}>
              {error}
            </div>
          )}
          
          {success && (
            <div style={{
              backgroundColor: '#e8f5e9',
              color: '#2e7d32',
              padding: '12px',
              borderRadius: '5px',
              marginBottom: '15px',
              border: '2px solid #66bb6a'
            }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Mot de passe (min. 6 caractères)"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="logbtn" disabled={loading}>
              {loading ? "Inscription..." : "Sign Up"}
            </button>
            
            <p style={{
              textAlign: 'center',
              marginTop: '15px',
              fontSize: '14px',
              color: '#666'
            }}>
              Already have an account? <Link to="/Login" style={{
                color: '#2c22a3',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>Sign In</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div>
          <button className="help-btn">Help</button>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/" className="facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/" className="instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/" className="linkedin">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Signup;
