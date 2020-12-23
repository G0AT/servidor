const Maleta = require('../models/Maleta');
const { validationResult } = require('express-validator');

exports.crearMaleta = async (req, res) => {
    //Revisar los errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(401).json({errores: errores.array()});
    }

    try{

        //Creamos la nueva maleta
        const maleta = new Maleta(req.body);

        //Tomamos el id del creador por JWT
        maleta.creador = req.usuario.id;

        //guardamos la maleta
        maleta.save();
        res.json(maleta);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Obtención de todos las maletas actuales
exports.obtenerMaletas = async (req, res) => {
    try{
        const maletas = await Maleta.find({creador: req.usuario.id}).sort({creado: -1});
        res.json({maletas});
    }catch(error){
        console.log(error);
        res.status(401).send({msg: 'Error al obtener maletas'});
    }
}

//Actualiza maletas por id
exports.actualizarMaleta = async (req, res) => {
    //Revisar los errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(401).json({errores: errores.array()});
    }

    //Extraer la información de maletas
    const { nombre } = rep.body;
    const nuevaMaleta = {};

    if(nombre){
        nuevaMaleta.nombre = nombre;
    }

    try{
        //Verificar id
        let maleta = await Maleta.findById(req.params.id);
        
        //Validar la existencia de maleta
        if(!maleta){
            return res.status(404).json({msg: 'Maleta no encontrado'})
        }

        //Verificar al creador
        if(maleta.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'Acceso no autorizado'});
        }

        //Actualizar
        maleta = await Maleta.findByIdAndUpdate({_id: req.params.id}, {$set: nuevaMaleta}, {new: true});
        res.json({maleta});

    }catch(error){
        console.log(error);
        res.status(503).send({msg: 'Error en el servidor'});
    }
}

//Elimina maleta por id
exports.eliminarMaleta = async (req, res) => {
    
    try{
        //Verificar id
        let maleta = await Maleta.findById(req.params.id);
        
        //Validar la existencia de la maleta
        if(!maleta){
            return res.status(404).json({msg: 'maleta no encontrada'})
        }

        //Verificar al creador
        if(maleta.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'Acceso no autorizado'});
        }

        //Eliminar maleta
        await Maleta.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Maleta eliminada'});

    }catch(error){
        console.log(error);
        res.status(503).send({msg: 'Error en el servidor'});
    }
}