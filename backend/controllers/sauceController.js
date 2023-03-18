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

// Liker/Dislike sauce
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (!sauce) {
        return res.status(404).json({ error: 'Sauce not found' });
      }

      const userId = req.userId;
      const userIndexInLikedArray = sauce.usersLiked.indexOf(userId);
      const userIndexInDislikedArray = sauce.usersDisliked.indexOf(userId);

      if (req.body.like === 1) {
        // User likes the sauce
        if (userIndexInLikedArray === -1) {
          sauce.usersLiked.push(userId);
          sauce.likes++;
        } else {
          return res.status(400).json({ error: 'Sauce already liked' });
        }
      } else if (req.body.like === -1) {
        // User dislikes the sauce
        if (userIndexInDislikedArray === -1) {
          sauce.usersDisliked.push(userId);
          sauce.dislikes++;
        } else {
          return res.status(400).json({ error: 'Sauce already disliked' });
        }
      } else if (req.body.like === 0) {
        // User cancels his like/dislike
        if (userIndexInLikedArray !== -1) {
          sauce.usersLiked.splice(userIndexInLikedArray, 1);
          sauce.likes--;
        } else if (userIndexInDislikedArray !== -1) {
          sauce.usersDisliked.splice(userIndexInDislikedArray, 1);
          sauce.dislikes--;
        }
      } else {
        return res.status(400).json({ error: 'Invalid like value' });
      }

      sauce.save()
        .then(() => {
          res.status(200).json({ message: 'Sauce liked/disliked/cancelled' });
        })
        .catch(error => {
          res.status(400).json({ error });
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};
