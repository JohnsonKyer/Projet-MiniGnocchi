const mongoose = require('mongoose')

const PlaylistSchema = new mongoose.Schema({
    _playlistId: {
        type: mongoose.Types.ObjectId
    },
    titre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    idVideos: {
        type: Array,
        required: true,
        minlength: 1,
        trim: true
    }
});

const Playlist = mongoose.model("Playlist", PlaylistSchema)

module.exports = { Playlist }