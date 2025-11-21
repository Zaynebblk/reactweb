// src/App.jsx
import React from "react";
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Entreprise from "./pages/Entreprise.jsx";
import Login from "./pages/Login.jsx";
import Article from "./pages/Article.jsx";
import Contact from "./pages/Contact.jsx";
import Resetpass from "./pages/Resetpass.jsx";
import Signup from "./pages/Signup.jsx";
import Client from "./pages/Client.jsx";
import Facture from "./pages/Facture.jsx";
import Historique from "./pages/Historique.jsx";

import "@fortawesome/fontawesome-free/css/all.min.css";


export default function App() {   
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/entreprise" />} />
      <Route path="/entreprise" element={<Entreprise />} />
      <Route path="/login" element={<Login />} />
      <Route path="/article" element={<Article />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Resetpass" element={<Resetpass />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Client" element={<Client />} />
      <Route path="/Facture" element={<Facture />} />
      <Route path="/Historique" element={<Historique />} />
     
    </Routes>
  );
}