// Importation des modules nécessaires
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Clé secrète pour le token JWT
const JWT_KEY = "SECRET_220520";

// Fonction pour la connexion d'un utilisateur
const loginUser = (req, res) => {
  const { email, password } = req.body;
  // Recherche d'un utilisateur dans la base de données à partir de l'email
  User.findOne({ email: email })
    .exec()
    .then((user) => {
      // Si l'utilisateur n'est pas trouvé, renvoie une erreur 401 (non autorisé)
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      // Comparaison du mot de passe fourni avec celui enregistré dans la base de données
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          // Si une erreur survient, renvoie une erreur 401 (non autorisé)
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          // Si les mots de passe correspondent, génère un token JWT valide pour une heure
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          // Renvoie une réponse avec un code 200 (OK) contenant le token et l'ID de l'utilisateur
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            userId: user._id,
          });
        }
        // Si les mots de passe ne correspondent pas, renvoie une erreur 401 (non autorisé)
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      // Si une erreur survient lors de la recherche d'un utilisateur, renvoie une erreur 500 (interne du serveur)
      res.status(500).json({
        error: err,
      });
    });
};

// Fonction pour l'enregistrement d'un utilisateur
function signupUser(req, res, next) {
  console.log(req.body);
  // Hash du mot de passe fourni pour le stockage dans la base de données
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    // Enregistrement de l'utilisateur dans la base de données
    user
      .save()
      .then(() => {
        // Génération d'un token JWT valide pour 24 heures
        const token = jwt.sign({ userId: user._id }, JWT_KEY, {
          expiresIn: "24h",
        });
        // Renvoie une réponse avec un code 201 (créé) contenant l'ID de l'utilisateur et le token
        res.status(201).json({
          userId: user._id,
          token: token,
        });
      })
      .catch((error) => {
        // Si une erreur survient lors de l'enregistrement de l'utilisateur, renvoie une erreur 500 (interne du serveur)
        res.status(500).json({
          error: error,
        });
      });
  });
}

  // Exportation des fonctions loginUser et signupUser
module.exports = {
  loginUser: loginUser,
  signupUser: signupUser,
};