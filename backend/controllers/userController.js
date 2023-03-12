const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

// Générer une clé secrète aléatoire de 64 octets
const JWT_KEY = crypto.randomBytes(64).toString('hex');

if (!JWT_KEY) {
  console.error('JWT_KEY is not set!');
  process.exit(1);
}

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
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
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

function signupUser(req, res, next) {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        const token = jwt.sign({ userId: user._id }, JWT_KEY, {
          expiresIn: "24h",
        });
        res.status(201).json({
          userId: user._id,
          token: token,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
}

module.exports = {
  loginUser: loginUser,
  signupUser: signupUser,
};