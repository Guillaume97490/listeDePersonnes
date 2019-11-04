const mongoose = require('../config/database');

let personneSchema = mongoose.Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    photo: String,
    domaine: {type: String, required: true},
    dob: {type: Date, required: true},
    ville: {type: String, required: true},
    genre: {type: String, required: true},
    dateChoisi: Date,
    choisi: {type: Boolean, default: false}
});

let Personne = mongoose.model('Personne', personneSchema);

module.exports = Personne;