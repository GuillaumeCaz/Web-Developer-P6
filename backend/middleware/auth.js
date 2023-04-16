const jwt = require('jsonwebtoken');
const JWT_SECRET = "SECRET_220520"; 

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId; 
    if (req.body.userId && req.body.userId !== userId) {
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


