const mongoose = require('mongoose')

const AnnonceSchema = new mongoose.Schema({
    _idAnnonce: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    idUtilisateur: {
        type: mongoose.Types.ObjectId,
    },
    titre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    miniature: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    video: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    tags: [{
        type: String,
        required: false,
        minlength: 1,
        trim: true
    }],
    impressions: {
        type: Number,
        required: false,
        minlength: 1,
        trim: true
    },
    engagements: {
        type: Number,
        required: false,
        minlength: 1,
        trim: true
    },
    nbVideos: {
        type: Number,
        required: false,
        minlength: 1,
        trim: true
    }
})

const Annonce = mongoose.model("Annonce", AnnonceSchema)

module.exports = { Annonce }
