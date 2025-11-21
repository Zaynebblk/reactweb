import React from "react";
import "../css/Contact.css";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div>
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

      <section className="contact-section">
        <div className="contact-info">
          <h2>Get In Touch With Us Now!</h2>
          <div className="info-grid">
            <div className="info-box">
              <h3>📞 Phone Number</h3>
              <p>+216 00 000 000</p>
            </div>
            <div className="info-box">
              <h3>📧 Email</h3>
              <p>
                ....@TechnoZone.com
                <br />
                sales@TechnoFinance.com
              </p>
            </div>
            <div className="info-box">
              <h3>📍 Location</h3>
              <p>
                Elghazela Technopark, 2088 Ariana,
                <br />
                Tunisia
              </p>
            </div>
            <div className="info-box">
              <h3>🕓 Working Hours</h3>
              <p>
                Monday To Saturday
                <br />
                08:30 AM To 05:30 PM
              </p>
            </div>
          </div>

          <div className="contact-icons">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon linkedin"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="contact-form">
          <h2>Contact Us</h2>
          <form>
            <div className="form-row">
              <input type="text" placeholder="First Name *" required />
              <input type="text" placeholder="Last Name *" required />
            </div>
            <div className="form-row">
              <input type="text" placeholder="Mobile Number *" required />
              <input type="email" placeholder="Email ID *" required />
            </div>
            <textarea placeholder=" Message *"></textarea>
            <label>Please type the characters You see*</label>
            <input type="text" placeholder="p e a @ 5 s" className="captcha" />
            <p className="note">This helps us prevent spam, thank you.</p>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </section>

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
};

export default Contact;
