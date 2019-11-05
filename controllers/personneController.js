const controller = {};
const moment = require('moment');
require('moment/locale/fr');

// importing model 
let Personne = require('../models/personne');



controller.index = (req, res) => {
    Personne.find({}, function(err, personnes) {
      if (err) throw err;
      res.render('./personne/index.ejs', {
        personnes: personnes,
        title: 'Accueil',
        moment: moment
        });
    });
};

controller.show = (req, res) => {
    Personne.findById(req.params.id, function(err, personne) {
        if (err) throw err;
        if (personne){
            res.render('./personne/show.ejs', {
                personne: personne, 
                title: personne._id,
                moment: moment
            });
        };
    })
}

controller.add = (req, res) => {
    res.render('./personne/form.ejs',{
        title: 'Nouveau'
    });
}


controller.save = (req, res) => {
        let sampleFile = req.files.photo;
        sampleFile.mv(`${__dirname}/../public/uploads/${sampleFile.name}`, function(err) {
            if (err)
                return res.status(500).send(err);
            // res.send('File uploaded!');
            let newPersonne = Personne({ // create a new item
                nom: req.body.nom,
                prenom: req.body.prenom,
                genre: req.body.genre,
                dob: req.body.dob,
                ville: req.body.ville,
                domaine: req.body.domaine,
                photo: sampleFile.name,
            });
       
            newPersonne.save(function(err) { // save the new item
                if (err) throw err;
                // console.log('Personne created successfully.');        
                res.redirect("/personne"); // redirect to index
            });
        });
    };

controller.tirage = (req, res) => {
    const dateDujour = moment().format('YYYY-MM-DD') + 'T00:00:00.000Z';
    Personne.find({ $or:[{'dateChoisi': null}, {'dateChoisi' : new Date(dateDujour)}] }, function(err, personnes){
        if (err) throw err;
        let candidats = [];
        let choisiDujour = undefined;
        personnes.forEach(personne => {
            if (personne.dateChoisi !== null){
                    choisiDujour = personne;
            }
            if(personne.dateChoisi == null){
                candidats.push(personne);
            }
        });
        if (choisiDujour == undefined){
            var personneDuJour = candidats[Math.floor(Math.random()*candidats.length)];
            choisiDujour = personneDuJour;
            console.log(candidats.length);
            if (candidats.length !== 0){
                Personne.findByIdAndUpdate(personneDuJour.id,{
                    dateChoisi: moment().format('YYYY-MM-DD'),
                    choisi: true
                },function(err, item) {
                    if (err) throw err;
                });
            }
        }
        res.render('./personne/tirage.ejs', {
            personne: choisiDujour,  
            title: 'Tirage du jour',
            moment: moment
        });
    });
}

controller.edit = (req, res) => {
    Personne.findById(req.params.id, function(err, item) {
        if (item.enabled === false){
            Personne.find({}, function(err, items) {
                if (err) throw err;
                return res.render('./personne/index.ejs', {
                    data: items,
                    errorMsg: 'Oups ! opération non permise',
                    title: 'Accueil'
                });
                
            });
        }
        else if (item){
            Personne.find({}, function(err, items) {
              if (err) throw err;
                res.render('./personne/form.ejs', {
                    dataEdit: item,
                    title: 'Edition de ' + item.id,
                    moment: moment
                });
            });
        };
    })
}

controller.update = (req, res) => {
    let sampleFile = req.files.photo;
    sampleFile.mv(`${__dirname}/../public/uploads/${sampleFile.name}`, function(err) {
        if (err)
            return res.status(500).send(err);
    Personne.findById(req.params.id, function(err, item) {
        if (item.enabled === false){
            Personne.find({}, function(err, items) {
                if (err) throw err;
                res.render('./personne/index.ejs', {
                    data: items,
                    errorMsg: 'Oups ! opération non permise',
                    title: 'Accueil'
                });
            });
        }
        else if (req.body.id){
            Personne.findByIdAndUpdate(req.params.id,{
                nom: req.body.nom,
                prenom: req.body.prenom,
                genre: req.body.genre,
                dob: req.body.dob,
                ville: req.body.ville,
                domaine: req.body.domaine,
                photo: sampleFile.name,
            }, 
            function(err, item) {
                if (err) throw err;
                res.redirect("/personne");
            });
        }
    })
})
}


controller.delete = (req, res) => { 
    Personne.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw err;
    res.redirect("/personne");
    });
}


controller.disable = (req, res) => {
    if (req.params.id){
        Personne.findById(req.params.id, function(err, item) {
            var enable = '';
            if (err) throw err;
            enable = !item.enabled
            Personne.findByIdAndUpdate(req.params.id,{
                enabled: enable
            },
            function(err, item) {
                if (err) throw err;
                res.redirect("/personne");
            });
        })
    }
}


module.exports = controller;