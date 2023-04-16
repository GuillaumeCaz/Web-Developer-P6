// Importation de Mongoose
const mongoose = require('mongoose');

// Fonction asynchrone pour établir la connexion à la base de données MongoDB
const connectDB = async () => {
  try {
    // Connexion à la base de données
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

// Exportation de la fonction connectDB pour l'utiliser dans d'autres fichiers
module.exports = connectDB;