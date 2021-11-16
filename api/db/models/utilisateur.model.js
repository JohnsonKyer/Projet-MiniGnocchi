const mongoose = require('mongoose')

bcrypt = require(bcrypt)

const UtilisateurSchema = new mongoose.Schema({
    _idUtilisateur: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    prenom: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    nom: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    mail: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    mdp: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    tags: [{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }],
    impressions: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    engagemets: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    nbVideos: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    }
})

const Utilisateur = mongoose.model("Utilisateur", UtilisateurSchema)

UtilisateurSchema.pre(save, function (next) {
    var utilisateur = this;

    // only hash the password if it has been modified (or is new)
    if (!utilisateur.isModified('mdp')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the mdp using our new salt
        bcrypt.hash(utilisateur.mdp, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext mdp with the hashed one
            utilisateur.mdp = hash;
            next();
        });
    });


});

UtilisateurSchema.methods.compareMdp = function (candidateMdp, cb) {
    bcrypt.compare(candidateMdp, this.mdp, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = { Utilisateur }