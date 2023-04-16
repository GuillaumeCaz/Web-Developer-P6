const express = require('express'); // Importe Express
const router = express.Router(); // Crée un routeur Express
const auth = require('../middleware/auth'); // Middleware d'authentification
const multer = require('../middleware/multer-config'); // Middleware pour la gestion des fichiers
const sauceCtrl = require('../controllers/sauceController'); // Importe les fonctions de contrôleur

router.get('/', auth, sauceCtrl.getAllSauces); // Route pour obtenir toutes les sauces
router.get('/:id', auth, sauceCtrl.getOneSauce); // Route pour obtenir une sauce par son ID
router.post('/', auth, multer, sauceCtrl.createSauce); // Route pour créer une nouvelle sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // Route pour modifier une sauce existante
router.delete('/:id', auth, sauceCtrl.deleteSauce); // Route pour supprimer une sauce existante
router.post('/:id/like', auth, sauceCtrl.likeSauce); // Route pour ajouter/supprimer un like sur une sauce existante

module.exports = router; // Exporte le routeur pour une utilisation dans d'autres fichiers


