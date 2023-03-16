const Sauce = require('../models/sauceModels');

// Toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => {
      res.status(200).json(sauces);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

// Trouver une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      res.status(200).json(sauce);
    })
    .catch(error => {
      res.status(404).json({ error });
    });
};

// Créer sauce
exports.createSauce = (req, res, next) => {
  const sauce = JSON.parse(req.body.sauce);
  const newSauce = new Sauce({
    ...sauce,
    userId : req.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  newSauce.save()
    .then(() => {
      res.status(201).json({ message: 'Sauce créée !' });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

// Modifier sauce
exports.modifySauce = (req, res, next) => {
  const sauce = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: 'Sauce modifiée !' });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

// Supprimer sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: 'Sauce supprimée !' });
          })
          .catch(error => {
            res.status(400).json({ error });
          });
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

