const express = require('express');
const connectDB = require('./database');
const app = express();
const port = 4200;
const User = require('./models/userModels');
const userRoutes = require('./routes/userRoutes');
const userControllers = require('./controllers/userController')
const sauceRoutes = require('./routes/sauceRoutes')
const auth = require('./middleware/auth')
const cors = require('cors'); 
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });


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
app.use('/api/sauces', auth, sauceRoutes);
app.use('/uploads', express.static('uploads'));

module.exports = app; 