import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import "../css/Historique.css";

const Historique = () => {
  const location = useLocation();
  const { client } = location.state || {};
  const [achats, setAchats] = useState([]);

  useEffect(() => {
    if (client) {
      // Récupérer l'historique depuis localStorage
      const savedHistory = localStorage.getItem(`technozone_history_${client.id}`);
      if (savedHistory) {
        setAchats(JSON.parse(savedHistory));
      }
    }
  }, [client]);

  if (!client) {
    return (
      <div className="historique-container">
        <h2>No Client Selected</h2>
        <Link to="/Client">
          <button className="back-btn">Back to Clients</button>
        </Link>
      </div>
    );
  }

  const totalGeneral = achats.reduce((sum, achat) => sum + achat.total, 0);

  return (
    <div className="historique-page">
      {/* Header */}
      <header>
        <div className="logo">TECHNOZONE</div>
        <nav>
          <Link to="/">ACCUEIL</Link>
          <Link to="/Article">ARTICLES</Link>
          <Link to="/Client">CLIENTS</Link>
          <Link to="/Entreprise">ENTREPRISE</Link>
          <Link to="/Contact">CONTACT</Link>
        </nav>
        <div className="user-section">
          <span>John Smith</span>
          <i className="fa-solid fa-user user-icon"></i>
        </div>
      </header>

      {/* Main Content */}
      <div className="historique-container">
        <div className="historique-header">
          <div>
            <h1>Purchase History</h1>
            <div className="client-info">
              <h2>{client.nom}</h2>
              <p><i className="fa-solid fa-envelope"></i> {client.email}</p>
              <p><i className="fa-solid fa-phone"></i> {client.telephone}</p>
              <p><i className="fa-solid fa-building"></i> {client.entreprise}</p>
              <span className={`status-badge ${client.statut.toLowerCase()}`}>
                {client.statut}
              </span>
            </div>
          </div>
          <div className="stats-summary">
            <div className="stat-card">
              <i className="fa-solid fa-shopping-cart"></i>
              <div>
                <h3>{achats.length}</h3>
                <p>Purchases Made</p>
              </div>
            </div>
            <div className="stat-card">
              <i className="fa-solid fa-coins"></i>
              <div>
                <h3>{totalGeneral.toFixed(3)} DT</h3>
                <p>Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-bar">
          <Link to="/Client">
            <button className="back-btn">
              <i className="fa-solid fa-arrow-left"></i> Back to Clients
            </button>
          </Link>
        </div>

        {/* Liste des achats */}
        {achats.length === 0 ? (
          <div className="no-history">
            <i className="fa-solid fa-receipt"></i>
            <h3>No Purchase Recorded</h3>
            <p>This client hasn't made any purchases yet</p>
          </div>
        ) : (
          <div className="achats-list">
            {achats.map((achat, index) => (
              <div key={index} className="achat-card">
                <div className="achat-header">
                  <div className="achat-info">
                    <h3>
                      <i className="fa-solid fa-file-invoice"></i>
                      Invoice #{achat.invoiceNumber}
                    </h3>
                    <p className="achat-date">
                      <i className="fa-solid fa-calendar"></i>
                      {achat.date}
                    </p>
                  </div>
                  <div className="achat-total">
                    <span className="total-label">Total Incl. Tax</span>
                    <span className="total-amount">{achat.total.toFixed(3)} DT</span>
                  </div>
                </div>

                <div className="achat-details">
                  <table className="produits-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {achat.produits.map((produit, idx) => (
                        <tr key={idx}>
                          <td>{produit.nom}</td>
                          <td>{produit.prix.toFixed(3)} DT</td>
                          <td>{produit.quantite}</td>
                          <td>{(produit.prix * produit.quantite).toFixed(3)} DT</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="totaux-section">
                    <div className="total-row">
                      <span>Total Excl. Tax:</span>
                      <span>{achat.totalHT.toFixed(3)} DT</span>
                    </div>
                    <div className="total-row">
                      <span>VAT (20%):</span>
                      <span>{achat.tva.toFixed(3)} DT</span>
                    </div>
                    {achat.remise > 0 && (
                      <div className="total-row remise">
                        <span>Discount:</span>
                        <span>-{achat.remise.toFixed(3)} DT</span>
                      </div>
                    )}
                    <div className="total-row final">
                      <span>Total Incl. Tax:</span>
                      <span>{achat.total.toFixed(3)} DT</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-info">
          <p>Founded 2025 • 30-day returns • 24/7 support</p>
        </div>
        <div>
          <button className="help-btn">HELP</button>
        </div>
      </footer>
    </div>
  );
};

export default Historique;
