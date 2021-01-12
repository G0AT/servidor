const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //Revisar los errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    const {email, password} = req.body;

    try{
        //revisar que sea un usuario registrado
        let usuario =  await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: 'El usuario o la contraseña son incorrectos'});
        }

        //revisar que el password sea correcto
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'El usuario o la contraseña son incorrectos'});
        }

        if(usuario.estatus !== "A"){
            return res.status(400).json({msg: 'Su usuario se encuentra inactivo, favor de contactar al administrador'});
        }

        //Crear el Json Web Token
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 14400 //vigencia por segundos
        }, (error, token) => {
            if(error) throw error;

           //Mensaje de confirmación
            res.json({ token });

        });

    }catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

//Obtenemos el usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
    try{
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    }catch(error){
        res.status(500).json({msg: 'Hubo un error'});
    }
}