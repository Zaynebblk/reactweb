import React, { useEffect, useRef } from 'react';
import './App.css';

export default function Dashboard() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      // Create chart using vanilla Chart.js from CDN (loaded via script tag)
      const loadChart = async () => {
        // Load Chart.js from CDN if not already loaded
        if (typeof window.Chart === 'undefined') {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
          script.async = true;
          document.head.appendChild(script);
          
          script.onload = () => {
            createChart();
          };
        } else {
          createChart();
        }
      };

      const createChart = () => {
        chartInstanceRef.current = new window.Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [{
              label: 'Ventes (Dinars)',
              data: [18500, 19500, 21000, 22500, 24000, 24500, 23000, 22000, 23500, 25000, 26500, 28000],
              borderColor: '#3498db',
              backgroundColor: 'rgba(52, 152, 219, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#3498db',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 5
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  color: '#2c3e50',
                  font: {
                    size: 12
                  }
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `Ventes: ${context.parsed.y} DT`;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: false,
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                  color: '#7f8c8d',
                  callback: function(value) {
                    return value + ' DT';
                  }
                }
              },
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  color: '#7f8c8d'
                }
              }
            }
          }
        });
      };

      loadChart();
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>TéchnoZone</h2>
        </div>
        <nav className="nav-menu">
          <ul>
            <li className="active"><a href="#">Tableau de Bord</a></li>
            <li><a href="#">Articles</a></li>
            <li><a href="#">Clients</a></li>
            <li><a href="#">Facturation</a></li>
            <li><a href="#">Paramètres</a></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1>Tableau de Bord :</h1>
        </header>

        {/* Graph Section */}
        <section className="graph-section">
          <h2>Graphique des ventes</h2>
          <div className="chart-container">
            <canvas ref={chartRef}></canvas>
          </div>
        </section>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-content">
              <h3>24.500 <span className="currency">DT</span></h3>
              <p>Chiffre d'affaires mensuel</p>
              <span className="trend positive">↑ 15% vs mois dernier</span>
            </div>
          </div>
          
          <div className="stat-card green">
            <div className="stat-content">
              <h3>51%</h3>
              <p>Taux de croissance</p>
              <span className="trend positive">↑ 5% vs trimestre dernier</span>
            </div>
          </div>
          
          <div className="stat-card orange">
            <div className="stat-content">
              <h3>156</h3>
              <p>Factures traitées</p>
              <span className="trend positive">↑ 8% vs mois dernier</span>
            </div>
          </div>
          
          <div className="stat-card red">
            <div className="stat-content">
              <h3>42</h3>
              <p>Nouveaux clients</p>
              <span className="trend positive">↑ 10% vs mois dernier</span>
            </div>
          </div>
        </div>

        {/* Services & Contact Sections */}
        <div className="sections-grid">
          {/* Services Section */}
          <section className="services-section">
            <h2>Nos Services :</h2>
            <ul className="services-list">
              <li>Gestion des factures</li>
              <li>Suivi des clients</li>
              <li>Gestion des stocks</li>
              <li>Comptabilité automatisée</li>
              <li>Rapports financiers</li>
              <li>Facturation électronique</li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="contact-section">
            <h2>Contact & Communications :</h2>
            <div className="contact-info">
              <p><strong>Email:</strong> contact@e-facturation.com</p>
              <p><strong>Téléphone:</strong> 55 181 294</p>
              <div className="contact-links">
                <a href="#">Support technique</a>
                <a href="#">Centre d'aide</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}