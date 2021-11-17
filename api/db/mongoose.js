// Ce fichier gère la connexion logique à la BDD MongoDB.

const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
const uri = "mongodb+srv://MiniGnocchi:minibaby@minicluster.metfo.mongodb.net/MiniGloabal?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
    console.log("Connexion effectuée à la base ! ;)")
}).catch((e) => {
    console.log("Erreur lors de la connexion à la BDD.");
    console.log(e);
})


module.exports = {
    mongoose
};