import React from "react";
import "../App.css";
import "../css/Product.css";
import { Link } from "react-router-dom";

const Laptop = () => {
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
          <h2>Our Laptops</h2>

          <div className="product-grid">
            <div className="product-card">
              <img src="src/imgs/laptop1.png" alt="Gaming Laptop" />
              <h3>Gaming Laptop – ASUS TUF F15</h3>
              <p className="price">Price: 3,100 TND</p>
              <p className="desc">
                Intel Core i7, RTX graphics, 16GB RAM, 144Hz display — powerful
                performance for gaming and multitasking.
              </p>
            </div>

            <div className="product-card">
              <img src="src/imgs/laptop2.jpg" alt="Ultrabook" />
              <h3>Ultrabook – MacBook Air M1</h3>
              <p className="price">Price: 3,600 TND</p>
              <p className="desc">
                Apple M1 chip, silent fanless design, long battery life, and a
                stunning Retina display.
              </p>
            </div>

            <div className="product-card">
              <img src="src/imgs/laptop3.png" alt="Student Laptop" />
              <h3>Student Laptop – Lenovo IdeaPad 3</h3>
              <p className="price">Price: 1,750 TND</p>
              <p className="desc">
                AMD Ryzen processor, lightweight design, and excellent value
                for everyday tasks and online learning.
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

export default Laptop;
