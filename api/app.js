const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
const { mongoose } = require('./db/mongoose')
bcrypt = require('bcrypt')
const { Playlist, Annonce, Utilisateur, Annonceur, Video } = require('./db/models')
const {searchVideos,getTagsByIdVideo} = require('./youtubeApi')

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
    let videos = req.body.videos
    let idUtilisateur = req.body.idUtilisateur
    let newPlaylist = new Playlist({
        titre,
        videos,
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
                videos: req.body.videos,
            },
            titre: req.body.titre
        }).then(() => {
            res.sendStatus(200);
        })
    } else if (req.body.action == "del") {
        Playlist.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { videos: req.body.videos }
        }).then(() => {
            res.sendStatus(200);
        })
    }
})


// Suppression d'une playlist par son identifiant.
app.delete('/playlists/:id', (req, res) => {
    Playlist.findOneAndRemove({
        _id: req.params.id
    }).then(() => {
        res.sendStatus(200)
    })
})

// app.post('/utilisateurs/inscription', async(req, res) => {
//     const { mail, mdp, genre, date, grade } = req.body
//     if (!(mail && mdp && genre && date && grade)) {
//         res.status(400).send("Tous les champs n'ont pas été remplis");
//     }
//     const utilisateur_existant = await Utilisateur.findOne({ mail });
//     if (utilisateur_existant) {
//         return res.status(400).send("L'email est déjà enregistrée, veuillez vous connecter.")
//     }
//     const utilisateur = new Utilisateur({ mail, mdp: await bcrypt.hash(mdp, 10), genre, date, grade })
//     utilisateur.save().then(() => {
//         res.sendStatus(200)
//     })

//     // let newPlaylist = new Playlist({
//     //     titre,
//     //     idVideos,
//     //     idUtilisateur
//     // })
//     // newPlaylist.save().then((PlaylistDoc) => {
//     //     res.send(PlaylistDoc)
//     // })

// })

app.post('/utilisateurs/inscription', async(req, res) => {
    const { mail, mdp, genre, date, grade } = req.body
    if (!(mail && mdp && genre && date && grade)) {
        res.status(400).send("Tous les champs n'ont pas été remplis");
    }
    const utilisateur_existant = await Utilisateur.findOne({ mail });
    if (utilisateur_existant) {
        return res.status(400).send("L'email est déjà enregistrée, veuillez vous connecter.")
    }
    const utilisateur = new Utilisateur({ mail, mdp: await bcrypt.hash(mdp, 10), genre, date, grade })
    utilisateur.save().then(() => {
        res.sendStatus(200)
    })

    // let newPlaylist = new Playlist({
    //     titre,
    //     idVideos,
    //     idUtilisateur
    // })
    // newPlaylist.save().then((PlaylistDoc) => {
    //     res.send(PlaylistDoc)
    // })

})

app.get('/getVideoTags/:id', async (req, res) => {
    res.send( await getTagsByIdVideo(req.params.id))
})

app.post('/searchVideos', async (req, res) => {
    let name = req.body.nameVideos;
    res.send( await searchVideos(name))
})


app.get('/utilisateurs', (req, res) => {
    Utilisateur.find({}).then((utilisateurs) => {
        res.send(utilisateurs)
    })
})


app.listen(3000, () => {
    console.log("Serveur UP sur le port 3000");
})
