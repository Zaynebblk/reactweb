import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Facture.css";

const Facture = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { invoiceData } = location.state || {};
  const [isSending, setIsSending] = useState(false);

  if (!invoiceData) {
    return (
      <div className="no-invoice">
        <h2>No invoice to display</h2>
        <button onClick={() => navigate("/client")}>Back to Clients</button>
      </div>
    );
  }

  const { client, produits, total, invoiceNumber, date, totalHT, tva, remise } = invoiceData;

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    console.log('📧 Sending invoice to:', client.email);
    
    try {
      const response = await fetch('http://localhost:5000/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientEmail: client.email,
          clientName: client.nom,
          invoiceNumber: invoiceNumber,
          date: date,
          products: produits,
          total: total,
          totalHT: totalHT,
          tva: tva,
          remise: remise
        })
      });

      const data = await response.json();
      console.log('📧 Server response:', data);
      
      if (data.success) {
        alert(`✅ Invoice sent successfully to ${client.email}!`);
      } else {
        console.error('❌ Email sending failed:', data);
        alert(`❌ Failed to send email:\n${data.message}\n${data.details || ''}\n\nPlease configure email credentials in backend/.env file.`);
      }
    } catch (error) {
      console.error('❌ Error sending email:', error);
      alert(`❌ Error connecting to server:\n${error.message}\n\nMake sure the backend server is running on port 5000.`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="facture-page">
      <div className="facture-container">
        {/* Header */}
        <div className="facture-header">
          <div className="company-info">
            <div className="logo-section">
              <img src="/src/imgs/logo.png" alt="TechnoZone" className="company-logo" />
              <h1>TECHNOZONE</h1>
            </div>
          </div>
          <div className="invoice-title">
            <h2>INVOICE N°</h2>
            <div className="invoice-number">{invoiceNumber}</div>
          </div>
        </div>

        {/* Client & Company Details */}
        <div className="details-section">
          <div className="client-details">
            <h3>Client:</h3>
            <p><strong>{client.nom}</strong></p>
            <p>Address: {client.entreprise}</p>
            <p>Phone: {client.telephone}</p>
            <p>Ref: {invoiceNumber}</p>
          </div>
          <div className="invoice-meta">
            <p><strong>Date:</strong> {date}</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="facture-table-container">
          <table className="facture-table">
            <thead>
              <tr>
                <th>Description:</th>
                <th>Unit Price:</th>
                <th>Quantity:</th>
                <th>Total:</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit, index) => (
                <tr key={index}>
                  <td className="product-name">
                    <select disabled>
                      <option>{produit.nom}</option>
                    </select>
                  </td>
                  <td>{produit.prix.toFixed(3)} DT</td>
                  <td>
                    <input type="text" value={`quantity: ${produit.quantite}`} disabled />
                  </td>
                  <td>{(produit.prix * produit.quantite).toFixed(3)} DT</td>
                </tr>
              ))}
              {/* Empty rows */}
              {[...Array(Math.max(0, 3 - produits.length))].map((_, i) => (
                <tr key={`empty-${i}`} className="empty-row">
                  <td>
                    <select disabled>
                      <option>Select</option>
                    </select>
                  </td>
                  <td>-</td>
                  <td>
                    <input type="text" value="quantity: -" disabled />
                  </td>
                  <td>-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Info */}
        <div className="payment-section">
          <div className="payment-info">
            <h4>PAYMENT:</h4>
            <p><strong>By bank check:</strong></p>
            <p>Bank: Attijari Bank</p>
            <p>RIB: 04 025 0012345678 90</p>
            <p>BIC: 1025 SAT 5006</p>
          </div>
          <div className="totals-section">
            <div className="total-row">
              <span>TOTAL EXCL. TAX:</span>
              <span>{totalHT.toFixed(2)} DT</span>
            </div>
            <div className="total-row">
              <span>VAT 20%:</span>
              <span>{tva.toFixed(2)} DT</span>
            </div>
            <div className="total-row">
              <span>DISCOUNT:</span>
              <span>{remise.toFixed(2)} DT</span>
            </div>
            <div className="total-row grand-total">
              <span>TOTAL INCL. TAX:</span>
              <span>{total.toFixed(2)} DT</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="facture-footer">
          <p>Thank you for your trust!</p>
          <p>TechnoZone - Founded 2025 • 24/7 Support: contact@technozone.tn</p>
        </div>
      </div>

      {/* Print Button - Hidden when printing */}
      <div className="action-buttons no-print">
        <button className="btn-back" onClick={() => navigate("/client")}>
          <i className="fa-solid fa-arrow-left"></i> Back to Clients
        </button>
        <button className="btn-email" onClick={handleSendEmail} disabled={isSending}>
          <i className="fa-solid fa-envelope"></i> {isSending ? 'Sending...' : 'Send Email'}
        </button>
        <button className="btn-print" onClick={handlePrint}>
          <i className="fa-solid fa-print"></i> Print
        </button>
      </div>
    </div>
  );
};

export default Facture;
