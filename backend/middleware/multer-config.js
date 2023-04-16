// Librairie multer
const multer = require('multer')

// Types de fichiers 
const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
}

// Configuration du stockage des fichiers dans le dossier 'images'
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images')
	},
	// Nom du fichier : nom d'origine sans espace + timestamp + extension
	filename: (req, file, callback) => {
		const space = file.originalname.split(' ').join('_')
		const name = space.split('.')
		const extension = MIME_TYPES[file.mimetype]
		callback(null, name[0] + Date.now() + '.' + extension)
	},
})

// Exportation de l'objet multer configuré pour accepter un fichier unique nommé 'image'
module.exports = multer({ storage: storage }).single('image')