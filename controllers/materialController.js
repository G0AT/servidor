const Material = require('../models/Material');
const Maleta = require('../models/Maleta');
const { validationResult } = require('express-validator');

exports.crearMaterial = async (req, res) => {
    //Revisar los errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(401).json({errores: errores.array()});
    }

    
    try{
        
        const {maleta} = req.body;
        const existenciaMaleta = await Maleta.findById(maleta);

        if(!existenciaMaleta){
            return res.status(404).json({msg: 'Maleta no existente'});
        }

        //Verificar al creador
        //Linea comentada para acceder a los espacios
        //if(existenciaMaleta.creador.toString() !== req.usuario.id ){
        //    return res.status(401).json({msg: 'Acceso no autorizado'});
        //}

        //Creamos el material
        const material = new Material(req.body);
        await material.save();
        res.json({material});

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Obtención de todos las maletas actuales
exports.obtenerMateriales = async (req, res) => {
    try{

        const {maleta} = req.query;

        //Tomamos y validamos la existencia de la maleta
        const existenciaMaleta = await Maleta.findById(maleta);

        if(!existenciaMaleta){
            return res.status(404).json({msg: 'Maleta no existente'});
        }

        //Verificar al creador
        //if(existenciaMaleta.creador.toString() !== req.usuario.id ){
        //    return res.status(401).json({msg: 'Acceso no autorizado'});
        //}

        //Elimino para poder ordenar a comodidad
        //.sort({creado: -1}) este va posterior al find
        const materiales = await Material.find({maleta});
        res.json({materiales});

    }catch(error){
        console.log(error);
        res.status(401).send({msg: 'Error al obtener maletas'});
    }
}

//Actualiza maleta por id
exports.actualizarMateriales = async (req, res) => {
    try{
        const {maleta, nombre, principal, subalmacen, codigo, estado} = req.body;

        //Validar si la tarea existe
        let material = await Material.findById(req.params.id);

        //Validamos la existencia del material
        if(!material){ return res.status(404).json({msg: 'Material no existente'}); }

        //Extraemos el maleta
        const existenciaMaleta = await Maleta.findById(maleta);

        //Verificar al creador
        //if(existenciaMaleta.creador.toString() !== req.usuario.id ){ 
        //    return res.status(401).json({msg: 'Acceso no autorizado'});
        //}

        //Creamos un objeto con nueva información
        const nuevoMaterial = {};
        nuevoMaterial.nombre = nombre;
        nuevoMaterial.principal = principal;
        nuevoMaterial.subalmacen = subalmacen;
        nuevoMaterial.codigo = codigo;
        nuevoMaterial.estado = estado;

        //Guardamos el material
        material = await Material.findOneAndUpdate({_id: req.params.id}, nuevoMaterial, {new: true});
        res.json({material});

    }catch(error){
        console.log(error);
        res.status(503).send({msg: 'Error en el servidor'});
    }
}

// Elimina una tarea
exports.eliminarMateriales = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { maleta } = req.query;

        // Si la tarea existe o no
        let material = await Material.findById(req.params.id);
        if(!material) {
            return res.status(404).json({msg: 'No existe el material'});
        }

        // extraer proyecto
        const existeMaleta = await Maleta.findById(maleta);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        //if(existeMaleta.creador.toString() !== req.usuario.id ) {
        //    return res.status(401).json({msg: 'No Autorizado'});
        //}

        // Eliminar
        await Material.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea Eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}