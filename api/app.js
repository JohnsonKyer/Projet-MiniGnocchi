const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose')

const { Playlist, Annonce } = require('./db/models')


app.use(express.json())

// Récupération de toutes les playlists
app.get('/playlists', (req, res) => {
    Playlist.find({}).then((playlists) => {
        res.send(playlists)
    })
})

// Création d'une playlist. 
app.post('/playlists', (req, res) => {
    let titre = req.body.titre
    let idVideos = req.body.idVideos
    let idUtilisateur = req.body.idUtilisateur
    let newPlaylist = new Playlist({
        titre,
        idVideos,
        idUtilisateur
    })
    newPlaylist.save().then((PlaylistDoc) => {
        res.send(PlaylistDoc)
    })

})

// Récupération de toutes les playlists d'un utilisateur par son identifiant.
app.get('/playlistsFromUser/:id', (req, res) => {
    Playlist.find({ idUtilisateur: req.params.id }).then((playlists) => {
        res.send(playlists)
    })
})

// Récupération de la playlist par l'identifiant de la playlist.
app.get('/playlists/:id', (req, res) => {
    Playlist.findOne({ _id: req.params.id }).then((playlists) => {
        res.send(playlists)
    })
})


// Ajout ou suppression d'un identifiant de vidéo à la playlist avec les champs "edit" et "del".
// Modification du titre de la playlist avec le champ "titre".
app.patch('/playlists/:id', (req, res) => {
    if (req.body.action == "edit") {
        Playlist.findOneAndUpdate({ _id: req.params.id }, {
            $addToSet: {
                idVideos: req.body.idVideo,
            },
            titre: req.body.titre
        }).then(() => {
            res.sendStatus(200);
        })
    } else if (req.body.action == "del") {
        Playlist.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { idVideos: req.body.idVideo }
        }).then(() => {
            res.sendStatus(200);
        })
    }
})


// Suppression d'une playlist par son identifiant.
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