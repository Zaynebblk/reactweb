import React from "react";
import "../App.css";
import "../css/Product.css";
import { Link } from "react-router-dom";

const Mouse = () => {
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
          <h2>Our Mice</h2>

          <div className="product-grid">
            <div className="product-card">
              <img className="reduced" src="src/imgs/mouse1.png" alt="Gaming Mouse" />
              <h3>Gaming Mouse – Logitech G502 Hero</h3>
              <p className="price">Price: 180 TND</p>
              <p className="desc">
                High-precision HERO sensor, customizable buttons, adjustable
                weights — perfect for competitive gaming.
              </p>
            </div>

            <div className="product-card">
              <img className="reduced" src="src/imgs/mouse logitech.webp" alt="Wireless Mouse" />
              <h3>Wireless Mouse – Logitech MX Master 3</h3>
              <p className="price">Price: 320 TND</p>
              <p className="desc">
                Ergonomic design, ultra-fast scrolling, multi-device support,
                and long-lasting battery life.
              </p>
            </div>

            <div className="product-card">
              <img className="reduced" src="src/imgs/mouse33.png" alt="Office Mouse" />
              <h3>Office Mouse – Microsoft Bluetooth Mouse</h3>
              <p className="price">Price: 95 TND</p>
              <p className="desc">
                Compact, comfortable, and reliable — ideal for everyday office
                work and portability.
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

export default Mouse;
