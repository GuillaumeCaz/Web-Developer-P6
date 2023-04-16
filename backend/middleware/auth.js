const jwt = require('jsonwebtoken');
const JWT_SECRET = "SECRET_220520"; // Clé secrète pour signer et vérifier les tokens JWT

module.exports = (req, res, next) => {
  try {
    // Récupération du token
    const token = req.headers.authorization.split(' ')[1];
    // Vérification et décodage du token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId; // Récupération de l'ID utilisateur depuis le token
    if (req.body.userId && req.body.userId !== userId) { // Vérification de l'ID utilisateur dans le corps de la requête    
    } else {
      req.userId = userId; // Ajout de l'ID utilisateur à la requête pour les prochaines étapes du traitement
      next(); // Poursuite du traitement de la requête
    }
  } catch {
    // Erreur de vérification du token ou de récupération de l'ID utilisateur
    res.status(401).json({
      error: new Error('Requête non authentifiée')
    });
  }
};
