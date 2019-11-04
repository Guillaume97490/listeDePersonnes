const mongoose = require('../config/database');

let personneSchema = mongoose.Schema({
    number1: Number,
    number2: Number,
    text: String,
    enabled: {type: Boolean, default: true}
});

let Personne = mongoose.model('Personne', personneSchema);

module.exports = Personne;