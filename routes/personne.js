const router = require('express').Router();
const personneController = require('../controllers/personneController.js');


// CRUD Routes

router.get('/', personneController.index);
router.get('/show/:id', personneController.show);
router.get('/add', personneController.add);
router.post('/save', personneController.save);
router.get('/edit/:id', personneController.edit);
router.post('/update/:id', personneController.update);
router.get('/delete/:id', personneController.delete);
router.get('/disable/:id', personneController.disable);

module.exports = router;