const mongoose = require('mongoose')

const PlaylistSchema = new mongoose.Schema({
    _idPlaylist: {
        type: mongoose.Types.ObjectId
    },
    idUtilisateur: {
        type: ObjectId,
        ref = 'Utilisateur',
    },
    titre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    idVideos: [{
        type: ObjectId,
        required: true,
        minlength: 1,
        trim: true,
        ref = 'Video'
    }],
});

const Playlist = mongoose.model("Playlist", PlaylistSchema)

module.exports = { Playlist }