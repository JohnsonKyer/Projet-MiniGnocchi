const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({origin: 'http://localhost:4200', credentials: true}));
const {verifInscription} = require("./middlewares/verifInscription");
const controller = require("./controllers/auth.controller");
const {authJwt} = require("./middlewares");
var bcrypt = require("bcryptjs");
app.use(express.json({limit: '50mb'}));


const {mongoose} = require('./db/mongoose')
bcrypt = require('bcrypt')
const {Playlist, Annonce, Utilisateur, Annonceur, Video} = require('./db/models')
const {searchVideos, getTagsByIdVideo, getVideoByIdVideo, TendanceVideos} = require('./youtubeApi')
const {uploadImage} = require('./imgurApi')
const bodyParser = require("body-parser");

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
    Playlist.find({idUtilisateur: req.params.id}).then((playlists) => {
        res.send(playlists)
    })
})

// Récupération des videos de la playlist par l'identifiant de la playlist.
app.get('/playlists/:id', (req, res) => {
    Playlist.findOne({_id: req.params.id}).then((playlists) => {
        res.send(playlists.videos)
    })
})


app.patch('/playlistsAjout/:id/', (req, res) => {
    Playlist.findOneAndUpdate({_id: req.params.id}, {
        $addToSet: {
            videos: req.body.videos,
        }
    }).then(() => {
        res.sendStatus(200);
    })
})

app.patch('/playlistsRetrait/:id', (req, res) => {
    Playlist.findOneAndUpdate({_id: req.params.id}, {
        $pull: {videos: {id: req.body.id}}
    }).then(() => {
        res.sendStatus(200);
    })
})

app.patch('/playlistsRename/:id', (req, res) => {
    Playlist.findOneAndUpdate({_id: req.params.id}, {
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
    Utilisateur.findOne({_id: req.params.id}).then((utilisateur) => {
        res.send(utilisateur.historique)
    })
})


app.patch('/historique/:id', (req, res) => {
    Utilisateur.findOneAndUpdate({_id: req.params.id}, {
        $addToSet: {
            historique: req.body.videos,
        }
    }).then(() => {
        res.sendStatus(200);
    })
})
app.post('/annonceur/inscription', async (req, res) => {
    const {mail, mdp, genre, date, grade} = req.body
    if (!(mail && mdp && genre && date && grade)) {
        res.status(400).send("Tous les champs n'ont pas été remplis");
    }
    const utilisateur_existant = await Utilisateur.findOne({mail});
    if (utilisateur_existant) {
        res.status(400).send("L'email est déjà enregistrée, veuillez vous connecter.")
    }
    const utilisateur = new Annonceur({
        mail: mail,
        mdp: await bcrypt.hash(mdp, 10),
        genre: genre,
        date: date,
        grade: 'annonceur'
    })
    utilisateur.save().then(() => {
        res.sendStatus(200)
    })
})

// GET toutes les annonces d'un annonceur
app.get('/annonceur/annonces/:id', async (req, res) => {
    Annonceur.find({_id: req.params.id}).then((annonceur) => {
        res.send(annonceur[0].annonces)
    })

});

app.get('/annonceur/annoncealeatoire', async (req, res) => {
    Annonceur.count({suspendu: null}).then((count) => {
        let random = Math.floor(Math.random() * count);
        Annonceur.find({suspendu: null}).skip(random).then((annonceur) => {
            let random = Math.floor(Math.random() * annonceur[0].annonces.length);
            res.send(annonceur[0].annonces[random]);
            addImpression(annonceur[0].annonces[random]._id)
        })
    })
});


function addImpression(id) {
    Annonceur.findOneAndUpdate({'annonces._id': id},
        {$inc: {'annonces.$.impressions': 1}});
}

const ImgurStorage = require('multer-storage-imgur');
const multer = require('multer');
const upload = multer({
    storage: ImgurStorage({clientId: '178ece219d86d47'})
})
app.post('/annonceur/uploadOnImgur', upload.single('uploadedImage'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })

})

app.patch('/annonceur/ajoutAnnonce/:id', async (req, res) => {
    let annonceModified = req.body.annonce
    annonceModified.tags = req.body.annonce.tags.split(',').filter((item) => item.trim().length > 0)
    annonceModified.engagements = 0
    annonceModified.impressions = 0
    annonceModified.nbVideos = 0
    Annonceur.findOneAndUpdate({_id: req.params.id}, {
        $addToSet: {
            annonces: annonceModified,
        }
    }).then(() => {
        res.sendStatus(200);
    })
})

app.patch('/annonceur/renameAnnonce/:id', (req, res) => {
    Annonceur.findOneAndUpdate({'annonces._id': req.params.id}, {
        'annonces.$.titre': req.body.titre
    }).then(() => {
        res.sendStatus(200);
    })
})

app.patch('/annonceur/retraitAnnonce/:id', (req, res) => {
    Annonceur.findOneAndUpdate({_id: req.params.id}, {
        $pull: {annonces: {_id: req.body.id}}
    }).then(() => {
        res.sendStatus(200);
    })
})

app.delete('/historique/:id', (req, res) => {
    Utilisateur.findOneAndUpdate({_id: req.params.id}, {
        $set: {historique: []}
    }).then(() => {
        res.sendStatus(200);
    })
})

// Retourne l'annonce par l'id de l'annonce contenue dans le body
// 'annonces.$':1 retourne le premier champ correspondant à la requête.
app.get('/annonceur/annonce/:id', (req, res) => {
    console.log(req.params.id)
    Annonceur.findOne({'annonces': {$elemMatch: {_id: req.params.id}}}, {'annonces.$': 1}).then((annonceur) => {
        if (annonceur) {
            res.send(annonceur.annonces[0])
        } else {
            console.log("error")
        }
    })
})

app.delete('/annonceur/annonces/:id', (req, res) => {
    Utilisateur.findOneAndUpdate({_id: req.params.id}, {
        $set: {annonces: []}
    }).then(() => {
        res.sendStatus(200);
    })
});
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
app.post('/uploadImage', async (req, res) => {
    let image = req.body.image;
    let url = await uploadImage(image)
    res.send(url)
})


app.get('/getVideoByIdVideo/:id', async (req, res) => {
    res.send(await getVideoByIdVideo(req.params.id))
})
app.get('/getTagsByIdVideo/:id', async (req, res) => {
    res.send(await getTagsByIdVideo(req.params.id))
})
app.post('/searchVideos', async (req, res) => {
    let name = req.body.nameVideos;
    res.send(await searchVideos(name))
})
app.get('/trendsVideo', async (req, res) => {
    res.send(await TendanceVideos())
})

app.get('/utilisateurs', (req, res) => {
    Utilisateur.find({}).then((utilisateurs) => {
        res.send(utilisateurs)
    })
})

app.patch('/utilisateurs/modificationmdp/:id', async (req, res) => {
    Utilisateur.findOneAndUpdate({_id: req.params.id}, {
        mdp: await bcrypt.hash(req.body.mdp, 10)
    }).then(() => {
        res.sendStatus(200);
    })
})

app.patch('/utilisateurs/modificationmail/:id', async (req, res) => {
    if (await Utilisateur.findOne({mail: req.body.mail})) {
        return res.status(400).send("L'email est déjà enregistrée, veuillez vous connecter.")
    }
    console.log("suite")
    Utilisateur.findOneAndUpdate({_id: req.params.id}, {
        mail: req.body.mail
    }).then(() => {
        return res.sendStatus(200);
    })
})
app.use(function (req, res, next) {
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
});
