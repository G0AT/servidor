const express = require('express');
const router = express.Router();
const maletaController = require('../controllers/maletaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

    //Crear grupos
    //api/maletas
    router.post('/',
        auth,
        [
            check('nombre', 'El nombre de la maleta es obligatorio').not().isEmpty()
        ],
        maletaController.crearMaleta
    );

    router.get('/',
        auth,
        maletaController.obtenerMaletas
    )

    router.put('/:id',
        auth,
        [
            check('nombre', 'El nombre del proyecto es obligatoio').not().isEmpty()
        ],
        maletaController.actualizarMaleta
    )

    router.delete('/:id',
        auth, 
        maletaController.eliminarMaleta
    )
module.exports = router;