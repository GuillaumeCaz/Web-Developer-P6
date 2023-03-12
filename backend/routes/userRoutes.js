const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

// Route pour se connecter
router.post('/login', userController.loginUser);
router.post('/signup', userController.signupUser);
module.exports = router;


