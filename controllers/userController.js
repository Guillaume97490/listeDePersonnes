const controller = {};
let User = require('../models/user');
// const passport = require('passport')



controller.viewLogin = (req, res) => {
    // Personne.find({}, function(err, personnes) {
    // if (err) throw err;
        res.render('./user/login.ejs', {
            title: 'Connexion',
        });
    // });
};

controller.login = (req,res)=>{
    console.log('test')
    passport.authenticate('local', { 
        successRedirect: '/personne',
        failureRedirect: '/personne/tirage-du-jour',
        failureFlash: true })
}

controller.register = (req, res) => {
    // Personne.find({}, function(err, personnes) {
    // if (err) throw err;
        res.render('./user/register.ejs', {
            title: 'Inscription',
        });
    // });
};
controller.saveRegister = (req, res) => {

    let newUser = User({ // create a new item
        username: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err) { // save the new item
        if (err) throw err;
        // console.log('Personne created successfully.');        
        res.redirect("/personne"); // redirect to index
    });
};




module.exports = controller;