const jwt = require('jsonwebtoken');//Importation du module de generation de token JWT
const JWT_SECRET = "SECRET_220520"; //Secret pour vérifier les jetons

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];//On récupère uniquement le jeton
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable';
    } else {
      req.userId = userId ;
      next();
    }
  } catch { 
    res.status(401).json({
      error: new Error('Requête non authentifiée')
    });
  }
};


