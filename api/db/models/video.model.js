const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    _idVideo: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    idAPIVideo: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    provenance: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    titre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    tags: [{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }]
})

const Video = mongoose.model("Video", VideoSchema)

module.exports = { Video }