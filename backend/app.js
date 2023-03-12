const express = require('express');
const connectDB = require('./database');
const app = express();
const port = 4200;
const User = require('./models/userModels');
const userRoutes = require('./routes/userRoutes');
const userControllers = require('./controllers/userController')
const cors = require('cors'); 
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors()); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDB()
  .then(() => {
  })
  .catch((err) => {
    console.error(err);
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/auth', userRoutes);


module.exports = app; 