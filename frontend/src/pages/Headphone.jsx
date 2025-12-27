import React from "react";
import "../App.css";
import "../css/Product.css";
import { Link } from "react-router-dom";

const Headphone = () => {
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
          <h2>Our Headphones</h2>

          <div className="product-grid">
            
            <div className="product-card">
              <img src="src/imgs/casque11.png" alt="Bluetooth Headset" />
              <h3>Gaming Headset – HyperX Cloud II</h3>
              <p className="price">Price: 380 TND</p>
              <p className="desc">
                7.1 surround sound, detachable noise-canceling microphone,
                optimal comfort for long gaming sessions.
              </p>
            </div>

            <div className="product-card">
              <img src="src/imgs/casque2.png" alt="Gaming Headset" />
              <h3>Wireless Headphones – Sony WH-1000XM4</h3>
              <p className="price">Price: 750 TND</p>
              <p className="desc">
                Active noise cancellation, up to 30 hours of battery life,
                Bluetooth connection, and premium comfort.
              </p>
            </div>

            <div className="product-card">
              <img src="src/imgs/casque3.png" alt="Studio Headphones" />
              <h3>Budget Headphones – JBL Tune 500</h3>
              <p className="price">Price: 190 TND</p>
              <p className="desc">
                Lightweight, foldable, powerful sound with deep bass for an
                excellent value.
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

export default Headphone;
