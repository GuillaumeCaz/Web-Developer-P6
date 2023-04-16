const mongoose = require('mongoose');

// Définition d'un schéma pour un utilisateur
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // L'email doit être unique
  },
  password: {
    type: String,
    required: true
  }
});

// Création d'un modèle User à partir du schéma
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;


