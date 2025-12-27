import React from "react";
import "../App.css";
import "../css/Product.css";
import { Link } from "react-router-dom";

const Keyboard = () => {
  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">
          <img src="src/imgs/logo.png" alt="logo" width="100" height="100" />
          <p>TechnoZone</p>
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

      <main className="main-content">
        {/* Products Section */}
        <section className="products">
          <h2>Our Keyboards</h2>

          <div className="product-grid">
            <div className="product-card">
              <img className="reduced" src="src/imgs/clavier1.png" alt="Mechanical Keyboard" />
              <h3>Mechanical Keyboard – Redragon K552</h3>
              <p className="price">Price: 220 TND</p>
              <p className="desc">
                Compact mechanical keyboard with RGB backlighting, durable
                switches, and excellent gaming performance.
              </p>
            </div>

            <div className="product-card">
              <img className="reduced" src="src/imgs/clavier2.png" alt="Wireless Keyboard" />
              <h3>Wireless Keyboard – Logitech MX Keys</h3>
              <p className="price">Price: 420 TND</p>
              <p className="desc">
                Smart illumination, ultra-comfortable typing, multi-device
                Bluetooth connectivity, and long battery life.
              </p>
            </div>

            <div className="product-card">
              <img className="reduced" src="src/imgs/clavier33.png" alt="Gaming Keyboard" />
              <h3>Gaming Keyboard – Razer BlackWidow</h3>
              <p className="price">Price: 520 TND</p>
              <p className="desc">
                Razer mechanical switches, customizable RGB lighting, and
                optimized for competitive gaming.
              </p>
            </div>
          </div>
        </section>
      </main>

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

export default Keyboard;
