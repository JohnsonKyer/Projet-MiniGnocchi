const mongoose = require('mongoose')

const PlaylistSchema = new mongoose.Schema({
    _idPlaylist: {
        type: mongoose.Types.ObjectId
    },
    idUtilisateur: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    titre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    idVideos: [{
        type: mongoose.Types.ObjectId,
        required: true,
        minlength: 1,
        trim: true
    }],
});

const Playlist = mongoose.model("Playlist", PlaylistSchema)

module.exports = { Playlist }