import React, { useState } from "react";
import "../css/Resetpass.css";
import { Link } from "react-router-dom";
function Resetpass() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here
    console.log("Password reset for:", email);
    alert(`Password reset link sent to ${email}`);
  };

  return (<div>
     <nav className="navbar">
        <div className="logo">
          <img
            src="src/imgs/logo.png"
            alt="technoZonelogo"
            width="100"
            height="100"
          />
          <span>
            <h1>TechnoZone</h1>
          </span>
        </div>
        
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/article">Article</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <a href="#" className="btn">
                Contact Us
              </a>
            </li>
          </ul>
        
      </nav>
    <div className="container">
      <h2>Reset Password Form</h2>
      <div className="form-box">
        <h3>Forgot Password</h3>
        <p>
          Provide the email address associated with your account to recover your
          password. Remember your password?{" "}
          <a href="/login" className="login">
            Log here
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your e-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Reset my Password</button>
        </form>
      </div>
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
    </div>
  );
}

export default Resetpass;
