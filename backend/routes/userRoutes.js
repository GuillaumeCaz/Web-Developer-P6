// Express
const express = require('express');

// Routeur express
const router = express.Router();

// Importation userController
const userController = require('../controllers/userController');

// Route pour se connecter
router.post('/login', userController.loginUser);

// Route pour s'inscrire
router.post('/signup', userController.signupUser);

// Exportation du routeur
module.exports = router;
