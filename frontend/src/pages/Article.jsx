import React from "react";
import "../css/Article.css";
import { Link } from "react-router-dom";

const Article = () => {
  return (
    <div>  
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
        <h1>
          Bienvenue chez <span>TechnoZone</span>
        </h1>
        <p>Où l’innovation rencontre la performance.</p>
      </section>

      <section id="produits" className="products">
        <h2>Nos Produits</h2>
        <div className="product-grid">
          <a href="pc.jsx" className="product-card">
            <img src="src\imgs\pc-portable.png" alt="PC Portable" />
            <h3>PC Portable</h3>
            <p>Puissance et mobilité réunies.</p>
          </a>
          <a href="clavier.jsx" className="product-card">
            <img src="/src/imgs/clavier.webp" alt="Clavier" />
            <h3>Clavier</h3>
            <p>Confort et précision pour vos doigts.</p>
          </a>
          <a href="souris.jsx" className="product-card">
            <img src="/src/imgs/souris.webp" alt="Souris" />
            <h3>Souris</h3>
            <p>Rapide, fluide et ergonomique.</p>
          </a>
          <a href="casque.jsx" className="product-card">
            <img src="/src/imgs/casque.webp" alt="Casque" />
            <h3>Casque</h3>
            <p>Plongez dans le son haute définition.</p>
          </a>
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

export default Article;
