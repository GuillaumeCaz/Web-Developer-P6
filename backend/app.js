const express = require('express');
const connectDB = require('./database');
const app = express();
const port = 4200;
const User = require('./models/userModels');
const userRoutes = require('./routes/userRoutes');
const sauceRoutes = require('./routes/sauceRoutes')
const auth = require('./middleware/auth')
const cors = require('cors'); 
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
require('dotenv').config();


app.use(cors()); 
app.use('/images', express.static(path.join(__dirname, 'images')));



connectDB()
  .then(() => {
  })
  .catch((err) => {
    console.error(err);
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', auth, sauceRoutes);
app.use('/uploads', express.static('uploads'));

module.exports = app; 