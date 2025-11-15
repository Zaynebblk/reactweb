# ReactWeb - Application de Gestion avec Authentification

Application web full-stack avec React (frontend) et Node.js/Express (backend) connectée à MySQL.

## 📋 Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration de la base de données](#configuration-de-la-base-de-données)
- [Lancement de l'application](#lancement-de-lapplication)
- [API Backend - Endpoints](#api-backend---endpoints)
- [Utilisation des fonctionnalités](#utilisation-des-fonctionnalités)
- [Structure du projet](#structure-du-projet)

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- MySQL Server (v5.7 ou supérieur)
- npm ou yarn
- Git

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/Zaynebblk/reactweb.git
cd reactweb
```

### 2. Installer les dépendances

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd ../backend
npm install
```

## 🗄️ Configuration de la base de données

### 1. Créer la base de données

Connectez-vous à MySQL :
```bash
mysql -u root -p
```

Exécutez les commandes SQL suivantes :

```sql
CREATE DATABASE web_bdd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE web_bdd;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  prenom VARCHAR(100),
  email VARCHAR(255) NOT NULL UNIQUE,
  motdepasse VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insérer un utilisateur de test
INSERT INTO users (nom, prenom, email, motdepasse) 
VALUES ('Test', 'User', 'test@example.com', 'password123');
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env` dans le dossier `backend/` :

```bash
cd backend
cp .env.example .env
```

Modifiez le fichier `.env` avec vos informations :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=VOTRE_MOT_DE_PASSE_MYSQL
DB_NAME=web_bdd
```

⚠️ **Important** : Remplacez `VOTRE_MOT_DE_PASSE_MYSQL` par votre mot de passe MySQL

## 🏃 Lancement de l'application

### Démarrer le backend

```bash
cd backend
node server.js
```

Le serveur backend sera accessible sur **http://localhost:5000**

### Démarrer le frontend (dans un autre terminal)

```bash
cd frontend
npm run dev
```

Le frontend sera accessible sur **http://localhost:5173**

## 🔌 API Backend - Endpoints

Le backend expose deux endpoints principaux pour l'authentification :

### 1. **POST /signup** - Inscription d'un nouvel utilisateur

#### Description
Permet de créer un nouveau compte utilisateur dans la base de données.

#### URL
```
POST http://localhost:5000/signup
```

#### Headers
```json
{
  "Content-Type": "application/json"
}
```

#### Body (JSON)
```json
{
  "nom": "Dupont",
  "prenom": "Marie",
  "email": "marie@example.com",
  "motdepasse": "password123"
}
```

#### Réponse en cas de succès (201)
```json
{
  "success": true,
  "message": "Inscription réussie !",
  "userId": 2
}
```

#### Réponse en cas d'erreur

**Email déjà utilisé (409)**
```json
{
  "success": false,
  "message": "Cet email est déjà utilisé"
}
```

**Données manquantes (400)**
```json
{
  "success": false,
  "message": "Email et mot de passe requis"
}
```

#### Exemple avec cURL
```bash
curl -X POST http://localhost:5000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dupont",
    "prenom": "Marie",
    "email": "marie@example.com",
    "motdepasse": "password123"
  }'
```

#### Exemple avec Postman
1. Méthode : **POST**
2. URL : `http://localhost:5000/signup`
3. Headers : `Content-Type: application/json`
4. Body → raw → JSON :
   ```json
   {
     "nom": "Dupont",
     "prenom": "Marie",
     "email": "marie@example.com",
     "motdepasse": "password123"
   }
   ```

---

### 2. **POST /login** - Connexion d'un utilisateur

#### Description
Permet de vérifier les identifiants d'un utilisateur et de le connecter.

#### URL
```
POST http://localhost:5000/login
```

#### Headers
```json
{
  "Content-Type": "application/json"
}
```

#### Body (JSON)
```json
{
  "email": "marie@example.com",
  "password": "password123"
}
```

#### Réponse en cas de succès (200)
```json
{
  "success": true,
  "message": "Connexion réussie !",
  "user": {
    "email": "marie@example.com"
  }
}
```

#### Réponse en cas d'erreur

**Identifiants incorrects (401)**
```json
{
  "success": false,
  "message": "Email ou mot de passe incorrect"
}
```

**Données manquantes (400)**
```json
{
  "success": false,
  "message": "Email et mot de passe requis"
}
```

#### Exemple avec cURL
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "marie@example.com",
    "password": "password123"
  }'
```

#### Exemple avec Postman
1. Méthode : **POST**
2. URL : `http://localhost:5000/login`
3. Headers : `Content-Type: application/json`
4. Body → raw → JSON :
   ```json
   {
     "email": "marie@example.com",
     "password": "password123"
   }
   ```

---

## 💻 Utilisation des fonctionnalités

### 1. Inscription (Sign Up)

#### Via l'interface web
1. Allez sur http://localhost:5173/Signup
2. Remplissez le formulaire :
   - Nom
   - Prénom
   - Email
   - Mot de passe (minimum 6 caractères)
   - Confirmation du mot de passe
3. Cliquez sur **Sign Up**
4. Un message de succès s'affiche
5. Vous êtes redirigé vers la page de connexion

#### Via API (JavaScript/Fetch)
```javascript
const signup = async () => {
  try {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: 'Dupont',
        prenom: 'Marie',
        email: 'marie@example.com',
        motdepasse: 'password123'
      })
    });
    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Erreur:', error);
  }
};
```

### 2. Connexion (Login)

#### Via l'interface web
1. Allez sur http://localhost:5173/Login
2. Entrez votre email et mot de passe
3. Cliquez sur **Login**
4. En cas de succès → redirection vers la page Entreprise
5. En cas d'échec → message d'erreur affiché

#### Via API (JavaScript/Fetch)
```javascript
const login = async () => {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'marie@example.com',
        password: 'password123'
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Connexion réussie!', data.user);
      // Redirection ou stockage du token
    } else {
      console.log('Erreur:', data.message);
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
};
```

### 3. Vérifier la base de données

Pour voir tous les utilisateurs enregistrés :

```sql
SELECT id, nom, prenom, email, created_at FROM users;
```

Pour compter le nombre d'utilisateurs :

```sql
SELECT COUNT(*) as total FROM users;
```

## 📁 Structure du projet

```
reactweb/
├── backend/
│   ├── database/           # Scripts SQL
│   ├── db.js              # Configuration MySQL avec dotenv
│   ├── server.js          # Serveur Express avec endpoints
│   ├── .env               # Variables d'environnement (NON versionné)
│   ├── .env.example       # Exemple de configuration
│   └── package.json       # Dépendances backend
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx      # Page de connexion
│   │   │   ├── Signup.jsx     # Page d'inscription
│   │   │   ├── Entreprise.jsx # Page d'accueil après connexion
│   │   │   ├── Article.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Resetpass.jsx
│   │   ├── css/
│   │   │   ├── login.css
│   │   │   └── Signup.css
│   │   └── App.jsx        # Routes de l'application
│   └── package.json       # Dépendances frontend
├── .gitignore             # Fichiers à ignorer par Git
└── README.md              # Ce fichier
```

## 🔐 Sécurité

### ⚠️ Important

Ce projet est actuellement en mode **développement**. Pour une utilisation en **production**, les améliorations suivantes sont nécessaires :

#### 1. Hasher les mots de passe

Installer bcrypt :
```bash
npm install bcrypt
```

Utilisation :
```javascript
const bcrypt = require('bcrypt');

// Lors de l'inscription
const hashedPassword = await bcrypt.hash(password, 10);

// Lors de la connexion
const isValid = await bcrypt.compare(password, hashedPassword);
```

#### 2. Utiliser des tokens JWT

Installer jsonwebtoken :
```bash
npm install jsonwebtoken
```

Génération d'un token :
```javascript
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '24h' });
```

#### 3. Ajouter des validations

- Validation des emails
- Validation de la force du mot de passe
- Sanitization des entrées utilisateur
- Rate limiting pour prévenir les attaques brute force

#### 4. Utiliser HTTPS en production

#### 5. Variables d'environnement sécurisées

Ne jamais commiter le fichier `.env` sur Git !

## 🔍 Dépannage

### Erreur : Port déjà utilisé

**Backend (port 5000)**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

**Frontend (port 5173)**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F
```

### Erreur de connexion MySQL

Vérifiez que MySQL est démarré et que les identifiants dans `.env` sont corrects.

### La base de données n'existe pas

Exécutez les commandes SQL de création de la base de données (voir section Configuration).

## 🧪 Tester l'API avec Postman

1. Téléchargez et installez [Postman](https://www.postman.com/downloads/)
2. Créez une nouvelle collection "ReactWeb API"
3. Ajoutez les deux requêtes (signup et login) comme décrit ci-dessus
4. Testez les endpoints

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/NouvelleFonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout de NouvelleFonctionnalite'`)
4. Push vers la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.
