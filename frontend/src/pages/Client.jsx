import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "../css/Client.css";

const Client = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    entreprise: ""
  });

  // Produits disponibles
  const [availableProducts] = useState([
    { id: 1, nom: "Laptop Dell XPS 15", prix: 3500 },
    { id: 2, nom: "Clavier Mécanique RGB", prix: 250 },
    { id: 3, nom: "Souris Gaming Logitech", prix: 180 },
    { id: 4, nom: "Casque Audio Sans Fil", prix: 320 },
    { id: 5, nom: "Écran 27 pouces 4K", prix: 1200 },
    { id: 6, nom: "Webcam HD 1080p", prix: 150 },
  ]);

  const [invoice, setInvoice] = useState({
    produits: [],
    currentProduct: "",
    quantite: 1
  });

  // Données initiales des clients
  const initialClients = [
    {
      id: 1,
      nom: "Ahmed Ben Salah",
      email: "ahmed.bensalah@gmail.com",
      telephone: "+216 50 123 456",
      entreprise: "TechWave",
      dernierAchat: "12/10/2025",
      totalDepenses: "920.000 DT",
      statut: "Actif"
    },
    {
      id: 2,
      nom: "Fatma Trabelsi",
      email: "fatma.trabelsi@outlook.com",
      telephone: "+216 98 654 321",
      entreprise: "GreenCom",
      dernierAchat: "28/09/2025",
      totalDepenses: "320.000 DT",
      statut: "Actif"
    },
    {
      id: 3,
      nom: "Sami Gharbi",
      email: "sami.gharbi@orange.tn",
      telephone: "+216 22 998 776",
      entreprise: "DataLine",
      dernierAchat: "15/08/2025",
      totalDepenses: "560.000 DT",
      statut: "Inactif"
    },
    {
      id: 4,
      nom: "Amina Kefi",
      email: "amina.kefi@yahoo.fr",
      telephone: "+216 54 345 210",
      entreprise: "SoftPlus",
      dernierAchat: "30/07/2025",
      totalDepenses: "245.000 DT",
      statut: "Actif"
    }
  ];
  
  // Charger les clients depuis localStorage ou utiliser les données initiales
  const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem('technozone_clients');
    return savedClients ? JSON.parse(savedClients) : initialClients;
  });

  // Sauvegarder les clients dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('technozone_clients', JSON.stringify(clients));
  }, [clients]);

  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.entreprise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = (e) => {
    e.preventDefault();
    const client = {
      id: clients.length + 1,
      nom: `${newClient.nom} ${newClient.prenom}`,
      email: newClient.email,
      telephone: newClient.telephone,
      entreprise: newClient.entreprise,
      dernierAchat: new Date().toLocaleDateString('fr-FR'),
      totalDepenses: "0.000 DT",
      statut: "Actif"
    };
    setClients([...clients, client]);
    setNewClient({ nom: "", prenom: "", email: "", telephone: "", entreprise: "" });
    setShowAddModal(false);
  };

  const handleDeleteClick = (client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setClients(clients.filter(c => c.id !== selectedClient.id));
    setShowDeleteModal(false);
    setSelectedClient(null);
  };

  const handleInputChange = (e) => {
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value
    });
  };

  const handleStatusChange = (clientId, newStatus) => {
    const updatedClients = clients.map(c => 
      c.id === clientId ? { ...c, statut: newStatus } : c
    );
    setClients(updatedClients);
  };

  const handleOpenInvoice = (client) => {
    setSelectedClient(client);
    setShowInvoiceModal(true);
    setInvoice({ produits: [], currentProduct: "", quantite: 1 });
  };

  const handleAddProductToInvoice = () => {
    if (!invoice.currentProduct) return;
    
    const product = availableProducts.find(p => p.id === parseInt(invoice.currentProduct));
    if (!product) return;

    const existingProduct = invoice.produits.find(p => p.id === product.id);
    
    if (existingProduct) {
      setInvoice({
        ...invoice,
        produits: invoice.produits.map(p => 
          p.id === product.id 
            ? { ...p, quantite: p.quantite + invoice.quantite }
            : p
        ),
        currentProduct: "",
        quantite: 1
      });
    } else {
      setInvoice({
        ...invoice,
        produits: [...invoice.produits, { ...product, quantite: invoice.quantite }],
        currentProduct: "",
        quantite: 1
      });
    }
  };

  const handleRemoveProductFromInvoice = (productId) => {
    setInvoice({
      ...invoice,
      produits: invoice.produits.filter(p => p.id !== productId)
    });
  };

  const calculateTotal = () => {
    return invoice.produits.reduce((total, p) => total + (p.prix * p.quantite), 0);
  };

  const handleConfirmPurchase = () => {
    const total = calculateTotal();
    const totalHT = total / 1.2; // Total HT (sans TVA)
    const tva = total - totalHT; // TVA 20%
    const remise = 0; // Remise (peut être personnalisée)
    
    // Extraire le montant numérique des dépenses actuelles
    const currentTotal = parseFloat(selectedClient.totalDepenses.replace(/[^\d.]/g, '')) || 0;
    const newTotal = currentTotal + total;

    // Mettre à jour les dépenses du client AVANT de naviguer
    const updatedClients = clients.map(c => 
      c.id === selectedClient.id 
        ? { 
            ...c, 
            totalDepenses: `${newTotal.toFixed(3)} DT`,
            dernierAchat: new Date().toLocaleDateString('fr-FR')
          }
        : c
    );
    
    setClients(updatedClients);

    // Trouver le client mis à jour
    const updatedClient = updatedClients.find(c => c.id === selectedClient.id);

    console.log("Ancien total:", selectedClient.totalDepenses);
    console.log("Nouveau total:", updatedClient.totalDepenses);
    console.log("Montant ajouté:", total.toFixed(3), "DT");

    const invoiceNumber = `INV${Date.now()}`;
    const date = new Date().toLocaleDateString('fr-FR');

    // Sauvegarder l'achat dans l'historique du client
    const purchaseData = {
      invoiceNumber: invoiceNumber,
      date: date,
      produits: invoice.produits,
      total: total,
      totalHT: totalHT,
      tva: tva,
      remise: remise
    };

    // Récupérer l'historique existant
    const historyKey = `technozone_history_${selectedClient.id}`;
    const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
    existingHistory.push(purchaseData);
    localStorage.setItem(historyKey, JSON.stringify(existingHistory));

    // Préparer les données de la facture avec le client mis à jour
    const invoiceData = {
      client: updatedClient,
      produits: invoice.produits,
      total: total,
      totalHT: totalHT,
      tva: tva,
      remise: remise,
      invoiceNumber: invoiceNumber,
      date: date
    };

    setShowInvoiceModal(false);
    
    // Alert de confirmation
    alert(`✅ Purchase Recorded!\n\nClient: ${updatedClient.nom}\nAmount: ${total.toFixed(3)} DT\nNew Total: ${updatedClient.totalDepenses}`);
    
    // Rediriger vers la page de facture
    navigate('/Facture', { state: { invoiceData } });
  };

  return (
    <div className="client-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="src/imgs/logo.png" alt="logo" width="80" height="80" />
          <p>TechnoZone</p>
        </div>
        <ul>
          <li>
            <Link to="/entreprise">HOME</Link>
          </li>
          <li>
            <Link to="/article">ARTICLES</Link>
          </li>
          <li>
            <Link to="/contact" className="btn">
              CONTACT US
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="client-main">
        <div className="client-header">
          <h1>Our Clients</h1>
        </div>

        <div className="client-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </div>

          <div className="action-buttons">
            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              <i className="fa-solid fa-plus"></i> Add Client
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="client-table-container">
          <table className="client-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Last Purchase</th>
                <th>Total Expenses</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td className="client-nom">{client.nom}</td>
                  <td className="client-email">
                    {client.email}
                    <i className="fa-solid fa-arrow-up-right-from-square email-icon"></i>
                  </td>
                  <td>{client.telephone}</td>
                  <td>{client.entreprise}</td>
                  <td>{client.dernierAchat}</td>
                  <td className="total-depenses">{client.totalDepenses}</td>
                  <td>
                    <select 
                      value={client.statut}
                      onChange={(e) => handleStatusChange(client.id, e.target.value)}
                      className={`status-select ${client.statut.toLowerCase()}`}
                    >
                      <option value="Actif">Active</option>
                      <option value="Inactif">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="view-btn" onClick={() => handleOpenInvoice(client)} title="New Purchase">
                        <i className="fa-solid fa-cart-shopping"></i> Purchase
                      </button>
                      <button 
                        className="history-btn" 
                        onClick={() => navigate('/Historique', { state: { client } })} 
                        title="Purchase History"
                      >
                        <i className="fa-solid fa-clock-rotate-left"></i>
                      </button>
                      <button className="delete-client-btn" onClick={() => handleDeleteClick(client)} title="Delete">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal Ajouter Client */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Client</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <form className="modal-form" onSubmit={handleAddClient}>
              <div className="form-row">
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="nom"
                    value={newClient.nom}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter last name"
                  />
                </div>
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="prenom"
                    value={newClient.prenom}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter first name"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={newClient.email}
                  onChange={handleInputChange}
                  required
                  placeholder="example@email.com"
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="telephone"
                  value={newClient.telephone}
                  onChange={handleInputChange}
                  required
                  placeholder="+216 XX XXX XXX"
                />
              </div>
              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  name="entreprise"
                  value={newClient.entreprise}
                  onChange={handleInputChange}
                  required
                  placeholder="Company name"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  <i className="fa-solid fa-plus"></i> Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Supprimer Client */}
      {showDeleteModal && selectedClient && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Client</h2>
              <button className="close-btn" onClick={() => setShowDeleteModal(false)}>
                ×
              </button>
            </div>
            <div className="warning-icon">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <p>Are you sure you want to delete this client?</p>
            <p>This action is irreversible.</p>
            <div className="client-info">
              <strong>{selectedClient.nom}</strong>
              <br />
              {selectedClient.email}
              <br />
              {selectedClient.entreprise}
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn-delete-confirm" onClick={confirmDelete}>
                <i className="fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Facture / Nouvel Achat */}
      {showInvoiceModal && selectedClient && (
        <div className="modal-overlay" onClick={() => setShowInvoiceModal(false)}>
          <div className="modal-content invoice-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Purchase - {selectedClient.nom}</h2>
              <button className="close-btn" onClick={() => setShowInvoiceModal(false)}>
                ×
              </button>
            </div>

            <div className="client-info-box">
              <p><strong>Client:</strong> {selectedClient.nom}</p>
              <p><strong>Company:</strong> {selectedClient.entreprise}</p>
              <p><strong>Email:</strong> {selectedClient.email}</p>
            </div>

            <div className="add-product-section">
              <h3>Add Products</h3>
              <div className="product-selector">
                <select 
                  value={invoice.currentProduct}
                  onChange={(e) => setInvoice({ ...invoice, currentProduct: e.target.value })}
                  className="product-select"
                >
                  <option value="">Select a product</option>
                  {availableProducts.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nom} - {p.prix.toFixed(3)} DT
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={invoice.quantite}
                  onChange={(e) => setInvoice({ ...invoice, quantite: parseInt(e.target.value) || 1 })}
                  className="quantity-input"
                  placeholder="Qty"
                />
                <button 
                  className="btn-add-product"
                  onClick={handleAddProductToInvoice}
                  disabled={!invoice.currentProduct}
                >
                  <i className="fa-solid fa-plus"></i> Add
                </button>
              </div>
            </div>

            {invoice.produits.length > 0 && (
              <div className="invoice-products">
                <h3>Selected Products</h3>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.produits.map(p => (
                      <tr key={p.id}>
                        <td>{p.nom}</td>
                        <td>{p.prix.toFixed(3)} DT</td>
                        <td>{p.quantite}</td>
                        <td className="subtotal">{(p.prix * p.quantite).toFixed(3)} DT</td>
                        <td>
                          <button 
                            className="btn-remove"
                            onClick={() => handleRemoveProductFromInvoice(p.id)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="invoice-total">
                  <strong>TOTAL: {calculateTotal().toFixed(3)} DT</strong>
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowInvoiceModal(false)}>
                Cancel
              </button>
              <button 
                className="btn-submit"
                onClick={handleConfirmPurchase}
                disabled={invoice.produits.length === 0}
              >
                <i className="fa-solid fa-file-invoice"></i> Confirm & Generate Invoice
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Client;