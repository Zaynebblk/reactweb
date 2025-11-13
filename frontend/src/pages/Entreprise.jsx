import React, { useEffect } from "react";
import "../css/Entreprise.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function Entreprise() {
  useEffect(() => {
    AOS.init();
  }, []);

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
      

      {/* Main Section */}
      <main className="mainsection">
        <div className="maintext">
          <h1 className="fade-in">Your Smart Source for Tech and Hardware.</h1>
          <p className="fade-in2">
            We provide the latest computers, accessories, and network equipment.
            We’ve got everything to power your setup.
            <br />
            Discover top-quality tech products that keep you connected,
            efficient, and ahead.
          </p>
        </div>

        <div className="mainimg">
          <img
            src="src\imgs\materiel-info.webp"
            alt="Entreprise"
            data-aos="zoom-in"
            data-aos-duration="1000"
          />
        </div>

        <div className="mainp">
          <p className="fade-in2">
            <strong>Connecting You To The World Of Innovation</strong>
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

export default Entreprise;
