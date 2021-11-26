const { Playlist, Annonce, Utilisateur, Annonceur, Video } = require('../db/models')

checkDuplicationMail = (req, res, next) => {
    Utilisateur.findOne({
        mail: req.body.mail
    }).exec((err, user) => {
        // Si la requête est mal exécutée
        if (err, utilisatur) {
            res.status(500).send({ message: err });
            return;
        }
        if (utilisatur) {
            res.status(400).send({ message: "Echec ! Adresse mail déjà utilisé" });
            return
        }
        next()
    })
}

const verifInscription = {
    checkDuplicationMail
}