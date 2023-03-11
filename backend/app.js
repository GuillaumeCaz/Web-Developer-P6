const express = require('express');
const connectDB = require('./database');
const app = express();
const port = 4200;
const User = require('./models/userModels');
const userRoutes = require('./routes/userRoutes');
const userControllers = require('./controllers/userController')

app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app; 

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

app.use('/users', userRoutes);