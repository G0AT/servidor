// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// validar los usuarios
// api/auth
router.post('/',
     authController.autenticarUsuario
);

//Obtenemos el usuario autenticado
router.get('/',
     auth,
     authController.usuarioAutenticado
);

module.exports = router;