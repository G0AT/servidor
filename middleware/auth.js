const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    //leer token
    const token = req.header('x-auth-token');

    //revisar si no existe token
    if(!token){
        return res.status(401).send({msg: 'No existe un token válido, permiso denegado'});
    }

    //validar el token
    try{
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    }catch(error){
        return res.status(401).send({msg: 'Token inválido'})
    }
}