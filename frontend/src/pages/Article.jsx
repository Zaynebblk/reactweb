import React from "react";
import "../App.css";
import "../css/Article.css";
import { Link } from "react-router-dom";

const Article = () => {
  return (
    <div className="page">  
      <nav className="navbar">
        <div className="logo">
            <img src="src\imgs\logo.png" alt="logo" width="80" height="80" />
             <p>TechnoZone </p>
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
      <section className="hero">
  <h1 >
    Welcome to <span>TechnoZone</span>
  </h1>
  <p>Where innovation meets performance.</p>
</section>

<section id="produits" className="products">
  <h2>Our Products</h2>
  <div className="product-grid1">
    <Link to="/Computer" className="product-card1">
      <img src="src/imgs/pc-portable.jpg" alt="Laptop" />
      <h3>Laptop</h3>
      <p>Power and mobility combined.</p>
    </Link>

    <Link to="/Keyboard" className="product-card1">
      <img src="/src/imgs/keyboard.jpg" alt="Keyboard" />
      <h3>Keyboard</h3>
      <p>Comfort and precision at your fingertips.</p>
    </Link>

    <Link to="/Mouse" className="product-card1">
      <img src="/src/imgs/mouse.jpg" alt="Mouse" />
      <h3>Mouse</h3>
      <p>Fast, smooth, and ergonomic.</p>
    </Link>

    <Link to="/Headphone" className="product-card1">
      <img src="/src/imgs/headphone.jpg" alt="Headset" />
      <h3>Headset</h3>
      <p>Dive into high-definition sound.</p>
    </Link>
  </div>
</section>
</main>

      {/* Footer */}
      <footer>
        <div>
          <button className="help-btn">Help</button>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/" className="facebook">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/" className="instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/" className="linkedin">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </footer>
    </div>
    
  );
};

export default Article;