// src/App.jsx
import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Entreprise from "./pages/Entreprise.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Article from "./pages/Article.jsx";
import Contact from "./pages/Contact.jsx";
import Resetpass from "./pages/Resetpass.jsx";

import "@fortawesome/fontawesome-free/css/all.min.css";


export default function App() {   
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/entreprise" />} />
      <Route path="/entreprise" element={<Entreprise />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/article" element={<Article />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Resetpass" element={<Resetpass />} />
     
    </Routes>
  );
}
