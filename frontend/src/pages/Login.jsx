
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Connexion réussie - redirection vers Entreprise
        navigate("/Article");
      } else {
        // Afficher le message d'erreur
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
        <div className="left-panel">
          <h1>Welcome back!</h1>
          <p>You can sign in to access your existing account.</p>
        </div>
        <div className="right-panel">
          <h2>Login</h2>
          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '15px',
              border: '1px solid #ef5350'
            }}>
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/Resetpass">Forgot password?</Link>
            </div>
            <button type="submit" className="logbtn" disabled={loading}>
              {loading ? "Connexion..." : "Login"}
            </button>
          </form>
          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '14px',
            color: '#666'
          }}>
            Vous n'avez pas de compte ? <Link to="/Signup" style={{
              color: '#2c22a3',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>Inscrivez-vous</Link>
          </p>
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

export default Login;
