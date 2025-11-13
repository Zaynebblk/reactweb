import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Response:", data);

      if (data.success) {
        window.location.href = "/main";
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
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
          <form onSubmit={handleSubmit}>
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
              <Link to="/forgotpass">Forgot password?</Link>
            </div>
            <button type="submit" className="logbtn">Login</button>
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

export default Login;
