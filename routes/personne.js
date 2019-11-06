const router = require('express').Router();
const personneController = require('../controllers/personneController.js');


// CRUD Routes

router.get('/', personneController.index);
router.get('/show/:id', personneController.show);
router.get('/add', personneController.add);
// router.get('/connexion', personneController.login);
// router.get('/inscription', personneController.register);
// router.post('/register', personneController.saveRegister);
router.post('/save', personneController.save);
router.get('/edit/:id', personneController.edit);
router.get('/tirage-du-jour', personneController.tirage);
router.get('/reset', personneController.reset);
router.post('/update/:id', personneController.update);
router.get('/delete/:id', personneController.delete);
router.get('/disable/:id', personneController.disable);

module.exports = router;