const controller = {};
const moment = require('moment');



// importing model 
let Personne = require('../models/personne');

controller.index = (req, res) => {
    // get all the collection
    Personne.find({}, function(err, personnes) {
      if (err) throw err;
      // console.log(items);
      res.render('./personne/index.ejs', {
        personnes: personnes,  // object of the all items
        title: 'Accueil',
        moment: moment
        });
    });
};

controller.show = (req, res) => {
    Personne.findById(req.params.id, function(err, personne) {
        if (err) throw err;
        if (personne){ 
            
            // console.log(personne);
            res.render('./personne/show.ejs', {
                personne: personne, // object of one personne
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


//    console.log(req.body);

    let sampleFile = req.files.photo;
    sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
        if (err)
        return res.status(500).send(err);
    })

    console.log(sampleFile);


    let newPersonne = Personne({ // create a new item
        nom: req.body.nom,
        prenom: req.body.prenom,
        genre: req.body.genre,
        dob: req.body.dob,
        ville: req.body.ville,
        domaine: req.body.domaine,
        photos: req.body.photos,
    });
   
    newPersonne.save(function(err) { // save the new item
        if (err) throw err;
        // console.log('Personne created successfully.');        
        res.redirect("/personne"); // redirect to index
    });
};

  
controller.edit = (req, res) => {
    Personne.findById(req.params.id, function(err, item) {
        console.log(item.enabled)
        if (item.enabled === false){
            Personne.find({}, function(err, items) {
                if (err) throw err;
                // console.log(items);
                return res.render('./personne/index.ejs', {
                    data: items,  // object of  the all items
                    errorMsg: 'Oups ! opération non permise',
                    title: 'Accueil'
                });
                
            });
        }
        else if (item){
            Personne.find({}, function(err, items) {
              if (err) throw err;
              // console.log(items);
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
    Personne.findById(req.params.id, function(err, item) {
        if (item.enabled === false){
            Personne.find({}, function(err, items) {
                if (err) throw err;
                // console.log(items);
                res.render('./personne/index.ejs', {
                    data: items, // object of the all items
                    errorMsg: 'Oups ! opération non permise',
                    title: 'Accueil'
                });
            });
        }
        else if (req.body.id){
            Personne.findByIdAndUpdate(req.params.id,{ // update one item with id
                nom: req.body.nom,
                prenom: req.body.prenom,
                genre: req.body.genre,
                dob: req.body.dob,
                ville: req.body.ville,
                domaine: req.body.domaine,
                photos: req.body.photos,
            }, 
            function(err, item) {
                if (err) throw err;
                res.redirect("/personne");
                // console.log(item);
            });
        }
    })
}


controller.delete = (req, res) => { 
    Personne.findByIdAndRemove(req.params.id, function(err) { // find and delete the item with id 
    if (err) throw err;

    res.redirect("/personne");
    console.log('Item deleted successfully');
    });
}


controller.disable = (req, res) => {
    if (req.params.id){
        Personne.findById(req.params.id, function(err, item) {
            // console.log(item)
            var enable = '';
            if (err) throw err;
            
            enable = !item.enabled // switch true/false
            Personne.findByIdAndUpdate(req.params.id,{ // update one item with id
                enabled: enable
            },
            function(err, item) {
                if (err) throw err;
                res.redirect("/personne");
            // console.log(item);
            });
        })
    }
}


module.exports = controller;