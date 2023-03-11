const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour créer un compte utilisateur
const { body } = require('express-validator');

router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 5 })
  ],
  userController.createUser
);


// Route pour se connecter
router.post('/login', userController.loginUser);

module.exports = router;


