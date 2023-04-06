
const multer = require('multer')

const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
}

const storage = multer.diskStorage({
	// dossier images
	destination: (req, file, callback) => {
		callback(null, 'images')
	},
	// fichier
	filename: (req, file, callback) => {
		const space = file.originalname.split(' ').join('_') // remplace les espaces par des _
		const name = space.split('.') // sépare le nom et l'extension
		const extension = MIME_TYPES[file.mimetype] // change les extensions
		callback(null, name[0] + Date.now() + '.' + extension)
	},
})

module.exports = multer({ storage: storage }).single('image')