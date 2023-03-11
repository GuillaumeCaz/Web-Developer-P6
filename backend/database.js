const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://guillaumecazeaudumec:CsA45Kzo@cluster0.miamuei.mongodb.net/mydatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connexion à MongoDB réussie !');
  } catch (error) {
    console.error('Connexion à MongoDB échouée !', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;