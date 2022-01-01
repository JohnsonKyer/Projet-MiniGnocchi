const config = require("../config/auth.config");
const {Playlist, Annonce, Utilisateur, Annonceur, Video} = require('../db/models/index')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

signup = async (req, res) => {
    const {mail, mdp, genre, date, grade} = req.body
    if (!(mail && mdp && genre && date && grade)) {
        res.status(400).send("Tous les champs n'ont pas été remplis");
    }
    const utilisateur_existant = await Utilisateur.findOne({mail});
    if (utilisateur_existant) {
        res.status(400).send("L'email est déjà enregistrée, veuillez vous connecter.")
    }
    let newUtilisateur;
    if (grade === 'utilisateur')
        newUtilisateur = new Utilisateur({
            mail: mail,
            mdp: await bcrypt.hash(mdp, 10),
            genre: genre,
            date: date,
            grade: grade
        })
    else
        newUtilisateur = new Annonceur({
            mail: mail,
            mdp: await bcrypt.hash(mdp, 10),
            genre: genre,
            date: date,
            grade: grade
        })
    newUtilisateur.save().then(() => {
        res.sendStatus(200)
    })

    // const user = new Utilisateur({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: bcrypt.hashSync(req.body.password, 8)
    // });

    // user.save((err, user) => {
    //     if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //     }
    // });
};

signin = (req, res) => {
    Utilisateur.findOne({
        mail: req.body.mail
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!user) {
            return res.status(404).send({message: "Mail introuvable", reason: "mail"});
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.mdp,
            user.mdp
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Mot de passe erroné",
                reason: "mdp"
            });
        }

        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        return res.status(200).send({
            id: user._id,
            mail: user.mail,
            playlists: user.playlists,
            grade: user.grade,
            date: user.date,
            accessToken: token
        });
    });
};

utilisateurAcces = (req, res) => {
    res.status(200).send("Utilisateur");
};
annonceurAcces = (req, res) => {
    res.status(200).send("annonceur");
};
moderateurAcces = (req, res) => {
    res.status(200).send("moderateur");
};


module.exports = {signin, signup, utilisateurAcces, annonceurAcces, moderateurAcces}
