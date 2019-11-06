const mongoose = require('../config/database');

let userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

let User = mongoose.model('User', userSchema);

module.exports = User;