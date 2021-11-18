const mongoose = require('mongoose')



// bcrypt = require(bcrypt)

const UtilisateurSchema = new mongoose.Schema({
    _idUtilisateur: {
        type: mongoose.Types.ObjectId,
        required: true
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
    genre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        minlength: 1,
        trim: true
    },
    grade: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    suspendu: {
        type: Date,
        required: false,
        minlength: 1,
        trim: true
    },
    playlists: [{
        type: mongoose.Types.ObjectId,
        required: false,
        trim: true
    }],
    historique: [{
        type: mongoose.Types.ObjectId,
        required: false,
        trim: true
    }]
}, )

const Utilisateur = mongoose.model("Utilisateur", UtilisateurSchema)

// const AnnonceurSchemaBrut = new mongoose.Schema({
//     annonces: [{
//         type: mongoose.Types.ObjectId,
//         required: true,
//         minlength: 0,
//         trim: true
//     }]
// }, { discriminatorKey: 'kind' })

// const AnnonceurSchema = Utilisateur.discriminator("Annonceur", AnnonceurSchemaBrut)
// const Annonceur = mongoose.model("Annonceur", AnnonceurSchema)

const Annonceur = Utilisateur.discriminator('Annonceur', new mongoose.Schema({
    annonces: [{
        type: mongoose.Types.ObjectId,
        required: true,
        minlength: 0,
        trim: true
    }]
}))

module.exports = { Utilisateur, Annonceur }

// UtilisateurSchema.pre(save, function(next) {
//     var utilisateur = this;

//     // only hash the password if it has been modified (or is new)
//     if (!utilisateur.isModified('mdp')) return next();

//     // generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);

//         // hash the mdp using our new salt
//         bcrypt.hash(utilisateur.mdp, salt, function(err, hash) {
//             if (err) return next(err);

//             // override the cleartext mdp with the hashed one
//             utilisateur.mdp = hash;
//             next();
//         });
//     });


// });

// UtilisateurSchema.methods.compareMdp = function(candidateMdp, cb) {
//     bcrypt.compare(candidateMdp, this.mdp, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };