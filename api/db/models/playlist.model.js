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
    videos: [{
        idVideo: {
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
        title: {
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
        }
    }],
});

const Playlist = mongoose.model("Playlist", PlaylistSchema)

module.exports = { Playlist }