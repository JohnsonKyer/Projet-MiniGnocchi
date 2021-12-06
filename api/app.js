const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
const { verifInscription } = require("./middlewares/verifInscription");
const controller = require("./controllers/auth.controller");
const { authJwt } = require("./middlewares");
var bcrypt = require("bcryptjs");


const { mongoose } = require('./db/mongoose')
bcrypt = require('bcrypt')
const { Playlist, Annonce, Utilisateur, Annonceur, Video } = require('./db/models')
const { searchVideos, getTagsByIdVideo, getVideoByIdVideo,TendanceVideos } = require('./youtubeApi')
const { uploadImage } = require('./imgurApi')

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

// Récupération des videos de la playlist par l'identifiant de la playlist.
app.get('/playlists/:id', (req, res) => {
    Playlist.findOne({ _id: req.params.id }).then((playlists) => {
        res.send(playlists.videos)
    })
})


// Ajout ou suppression d'un identifiant de vidéo à la playlist avec les champs "edit" et "del".
// Modification du titre de la playlist avec le champ "titre".
app.patch('/playlistsAjout/:id/', (req, res) => {
    Playlist.findOneAndUpdate({ _id: req.params.id }, {
        $addToSet: {
            videos: req.body.videos,
        }
    }).then(() => {
        res.sendStatus(200);
    })
})

app.patch('/playlistsRetrait/:id', (req, res) => {
    Playlist.findOneAndUpdate({ _id: req.params.id }, {
        $pull: { videos: { id: req.body.id } }
    }).then(() => {
        res.sendStatus(200);
    })
})

app.patch('/playlistsRename/:id', (req, res) => {
    Playlist.findOneAndUpdate({ _id: req.params.id }, {
        titre: req.body.titre
    }).then(() => {
        res.sendStatus(200);
    })
})


// Suppression d'une playlist par son identifiant.
app.delete('/playlists/:id', (req, res) => {
    Playlist.findOneAndRemove({
        _id: req.params.id
    }).then(() => {
        res.sendStatus(200)
    })
})

app.get('/historique/:id', (req, res) => {
    Utilisateur.findOne({ _id: req.params.id }).then((utilisateur) => {
        res.send(utilisateur.historique)
    })
})



app.patch('/historique/:id', (req, res) => {
    Utilisateur.findOneAndUpdate({ _id: req.params.id }, {
        $addToSet: {
            historique: req.body.videos,
        }
    }).then(() => {
        res.sendStatus(200);
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
app.post('/uploadImage', async(req, res) => {
    let image = req.body.image;
    let url = await uploadImage(image)
    res.send(url)
})



app.get('/getVideoByIdVideo/:id', async(req, res) => {
    res.send(await getVideoByIdVideo(req.params.id))
})
app.get('/getTagsByIdVideo/:id', async(req, res) => {
    res.send(await getTagsByIdVideo(req.params.id))
})
app.post('/searchVideos', async(req, res) => {
    let name = req.body.nameVideos;
    res.send(await searchVideos(name))
})
app.get('/trendsVideo', async(req, res) => {
    res.send(await TendanceVideos())
})

app.get('/utilisateurs', (req, res) => {
    Utilisateur.find({}).then((utilisateurs) => {
        res.send(utilisateurs)
    })
})

app.patch('/utilisateurs/modificationmdp/:id', async(req, res) => {
    Utilisateur.findOneAndUpdate({ _id: req.params.id }, {
        mdp: await bcrypt.hash(req.body.mdp, 10)
    }).then(() => {
        res.sendStatus(200);
    })
})

app.patch('/utilisateurs/modificationmail/:id', async(req, res) => {
    if (await Utilisateur.findOne({ mail: req.body.mail })) {
        return res.status(400).send("L'email est déjà enregistrée, veuillez vous connecter.")
    }
    console.log("suite")
    Utilisateur.findOneAndUpdate({ _id: req.params.id }, {
        mail: req.body.mail
    }).then(() => {
        return res.sendStatus(200);
    })
})
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.post("/utilisateurs/inscription", controller.signup);

app.post("/utilisateurs/connexion", controller.signin);




app.get("/api/test/user", [authJwt.verifToken], controller.utilisateurAcces), (req, res) => {
    console.log(req, res)
    res.sendStatus(200)
};

app.get("/api/test/mod", [authJwt.verifToken, authJwt.isModerateur], controller.moderateurAcces), (req, res) => {
    console.log(req, res)
    res.sendStatus(200)
};

app.get("/api/test/admin", [authJwt.verifToken, authJwt.isAnnonceur], controller.annonceurAcces), (req, res) => {
    console.log(req, res)
    res.sendStatus(200)
};


app.listen(3000, () => {
    console.log("Serveur UP sur le port 3000");
})
