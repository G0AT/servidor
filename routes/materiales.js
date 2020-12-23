const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crear grupos
    //api/materiales
    router.post('/',
        auth,
        [
            check('nombre', 'El nombre de grupo no puede estar vacio').not().isEmpty(),
            check('maleta', 'La maleta debe existir').not().isEmpty(),
            check('cantidad', 'La cantidad no puede ser menor a 0').not().isEmpty(),
            check('codigo', 'El código debe de existir').not().isEmpty()
        ],
        materialController.crearMaterial
    );

    router.get('/',
        auth,
        materialController.obtenerMateriales
    )

    router.put('/:id', 
        auth,
        materialController.actualizarMateriales
    )

    router.delete('/:id', 
        auth,
        materialController.eliminarMateriales
    )

module.exports = router;