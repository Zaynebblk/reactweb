import { Link } from "react-router-dom";
import "../css/login.css";

function Login() {
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="src/imgs/logo.png" alt="logo" width="80" height="80" />
          <h2>TechnoZone</h2>
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
      <main className="container">
        <div className="left-panel">
          <h1>Welcome back!</h1>
          <p>You can sign in to access your existing account.</p>
        </div>
        <div className="right-panel">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="options">
              <label>
                <input type="checkbox" />Remember me
              </label>
              <Link to="/resetpass">Forgot password?</Link>
            </div>
            <button type="submit" className="logbtn">Login</button>
          </form>
        </div>
      </main>

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
