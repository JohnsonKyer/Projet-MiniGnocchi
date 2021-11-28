const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { annonceurAcces } = require("../controllers/auth.controller.js");
const { Playlist, Annonce, Utilisateur, Annonceur, Video } = require('../db/models')

verifToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "Token manquant" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Vous n'êtes pas autorisé à faire cette action" });
        }
        console.log(decoded)
        console.log(req.body.utilisateurId)
        req.body.utilisateurId = decoded.id;
        console.log(req.body.utilisateurId)
        next();
    });
};

isAnnonceur = (req, res, next) => {
    console.log(req.body.utilisateurId)
    Utilisateur.findById(req.body.utilisateurId).exec((err, annonceur) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        console.log(annonceur)
        if (annonceur.grade == "annonceur")
            next()
        else
            res.status(403).send({ message: "Vous devez être annonceur pour accéder" })
    });
};

isModerateur = (req, res, next) => {
    Utilisateur.findById(req.body.utilisateurId).exec((err, utilisateur) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (utilisateur.grade == "moderateur")
            next()
        else
            res.status(403).send({ message: "Vous devez être modérateur pour accéder" })
    });
};


const authJwt = {
    verifToken,
    isModerateur,
    isAnnonceur
};
module.exports = authJwt;