const mongoose = require('mongoose')

const AnnonceSchema = new mongoose.Schema({
    _annonceId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    titre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

const Annonce = mongoose.model("Annonce", AnnonceSchema)

module.exports = { Annonce }