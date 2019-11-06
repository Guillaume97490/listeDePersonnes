const router = require('express').Router();
const userController = require('../controllers/userController.js');


router.get('/connexion', userController.viewLogin);
// router.post('/connexion', userController.login);
router.get('/inscription', userController.register);
router.post('/register', userController.saveRegister);

module.exports = router;
