
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
        // Connexion réussie - redirection vers tableau de bord
        navigate("/dashboard");
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
    <div className="login-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="src/imgs/logo.png" alt="logo" width="80" height="80" />
          <h1>TechnoZone</h1>
        </div>
        <ul>
          <li>
            <Link to="/entreprise">Home</Link>
          </li>
          <li>
            <Link to="/article">Article</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/contact" className="btn">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main container */}
      <main className="container login-page">
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
                <input type="checkbox" className="remember"/>Remember me
              </label>
              <Link to="/resetpass" className="f">Forgot password?</Link>
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
      </main>

      {/* Footer */}
      <footer>
        <div>
          <button className="help-btn">Help</button>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/" className="facebook">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/" className="instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/" className="linkedin">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Login;
