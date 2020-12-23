// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');

// crea un usuario
// api/usuarios
router.post('/',
     [
          check('nombre', 'El nombre es obligatorio').not().isEmpty(),
          check('email', 'El email es obligatorio').isEmail(),
          check('password', 'El password requiere mínimo 8 caracteres').isLength({min: 8})
     ],
     usuarioController.crearUsuario
);

module.exports = router;