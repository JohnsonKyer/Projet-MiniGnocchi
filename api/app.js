const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose')

const { Playlist, Annonce } = require('./db/models')


app.use(express.json())

app.get('/playlists', (req, res) => {

    Playlist.find({}).then((playlists) => {
        res.send(playlists)
    })
})


app.post('/playlists', (req, res) => {
    let titre = req.body.titre
    let idVideos = req.body.idVideos
    let newPlaylist = new Playlist({
        titre,
        idVideos
    })
    newPlaylist.save().then((PlaylistDoc) => {
        res.send(PlaylistDoc)
    })

})

app.patch('/playlists/:id', (req, res) => {
    Playlist.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

app.delete('/playlists/:id', (req, res) => {
    Playlist.findOneAndRemove({
        _id: req.params.id
    }).then((removedPlaylistDoc) => {
        res.send(removedPlaylistDoc)
    })
})


app.get('/annonces')

app.listen(3000, () => {
    console.log("Serveur UP sur le port 3000");
})