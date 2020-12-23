const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    //Revisar los errores
    const errores = validationResult(req);

    
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    const {email, password} = req.body;

    try{
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe'});
        }

        //Crea el nuevo usuario
        usuario = new Usuario(req.body);

        //hashear el password
        const salt= await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //Guarda el usuario
        await usuario.save();

        //Crear el Json Web Token
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //vigencia por segundos
        }, (error, token) => {
            if(error) throw error;

           //Mensaje de confirmación
            res.json({ token });

        });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}