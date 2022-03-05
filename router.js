const express = require('express');
const router = express.Router();

// Importando controladores
const homeControllers = require('./src/controllers/homeControllers');
const loginControllers = require('./src/controllers/loginControllers');
const contatoControllers = require('./src/controllers/contatoControllers');
const { checkLogin } = require('./src/middlewares/middlewares')

// Routers Home
router.get('/', homeControllers.index);

// Routers Login
router.get('/login/index', loginControllers.index);
router.post('/login/register', loginControllers.register);
router.post('/login/login', loginControllers.login);
router.get('/login/logout', checkLogin , loginControllers.logout);

// Routers Contato
router.get('/contato/index', checkLogin ,contatoControllers.index);
router.post('/contato/register', checkLogin ,contatoControllers.register);
router.get('/contato/index/:id', checkLogin ,contatoControllers.editContato);
router.post('/contato/edit/:id', checkLogin ,contatoControllers.edit);
router.get('/contato/delete/:id', checkLogin ,contatoControllers.delete);

module.exports = router;