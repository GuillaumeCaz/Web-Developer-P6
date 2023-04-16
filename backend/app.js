// Importation des dépendances nécessaires

const express = require('express');// Express
const connectDB = require('./database'); // Connexion à la base de données
const app = express(); // Création de l'application express
const userRoutes = require('./routes/userRoutes'); // Routes pour les utilisateurs
const sauceRoutes = require('./routes/sauceRoutes') // Routes pour les sauces
const auth = require('./middleware/auth') // Middleware d'authentification
const cors = require('cors'); // Middleware pour la gestion de CORS
const bodyParser = require('body-parser'); // Middleware pour la gestion des requêtes HTTP
const multer = require('multer'); // Middleware pour la gestion des images
const path = require('path'); // Bibliothèque pour la gestion des chemins d'accès

// Connexion à la base de données
connectDB()
  .then(() => {
  })
  .catch((err) => {
    console.error(err);
  });

//CORS
app.use(cors()); 

// Chemin d'accès images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Gestion des requêtes HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes Utilisateurs
app.use('/api/auth', userRoutes);

// Routes Sauces, avec authentification
app.use('/api/sauces', auth, sauceRoutes);


// Exportation de l'application express
module.exports = app;