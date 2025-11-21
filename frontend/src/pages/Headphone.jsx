import React from "react";
import "../css/Article.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Headphone = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/src/imgs/logo.png" alt="logo" width="80" height="80" />
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


      <main className="main-content" style={{ flex: 1 }}>
        <section className="hero">
          <h1>
            Welcome to <span>TechnoZone</span>
          </h1>
          <p>Premium Headphones Collection</p>
        </section>

        <section id="produits" className="products">
          <h2>Our Headphones</h2>
          <div className="product-grid">
            
            <a href="#" className="product-card">
              <img src="/src/imgs/casque.jpg" alt="Gaming Headset" />
              <h3>Gaming Headset – HyperX Cloud II</h3>
              <p className="price">$380</p>
              <p>
                7.1 surround sound, detachable mic, optimal comfort for gaming sessions.
              </p>
            </a>

            
            <a href="#" className="product-card">
              <img src="/src/imgs/casque.jpg" alt="Wireless Headset" />
              <h3>Wireless – Sony WH-1000XM4</h3>
              <p className="price">$750</p>
              <p>
                Active noise cancellation, 30-hour battery, premium comfort.
              </p>
            </a>

            
            <a href="#" className="product-card">
              <img src="/src/imgs/casque.jpg" alt="Budget Headset" />
              <h3>Budget Friendly – JBL Tune 500</h3>
              <p className="price">$190</p>
              <p>
                Lightweight, foldable, powerful sound with great value for money.
              </p>
            </a>
          </div>
        </section>
      </main>


      <footer>
        <div>
          <button className="help-btn">Help</button>
        </div>

        <div className="social-icons">
          <a href="https://www.facebook.com/" className="facebook">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>

          <a href="https://www.instagram.com/" className="instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a href="https://www.linkedin.com/in/" className="linkedin">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Headphone;
