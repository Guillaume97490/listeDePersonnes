const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');


app.use(fileUpload({ safeFileNames: true }));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// importing routes
const personneRoutes = require('./routes/personne');
const userRoutes = require('./routes/user');

// settings
app.set('port', process.env.PORT || 3000);

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.use('/personne', personneRoutes);
app.use('/user', userRoutes);

/*  PASSPORT SETUP  */

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

let User = require('./models/user');

/* PASSPORT LOCAL AUTHENTICATION */

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
      User.findOne({
        username: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
  }
));

app.post('/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username='+req.user.username);
});


app.post('/user/connexion', passport.authenticate('local', { 
    successRedirect: '/personne',
    failureRedirect: '/personne/tirage-du-jour',
    failureFlash: true })
);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});