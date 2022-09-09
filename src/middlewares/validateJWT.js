const jwt = require('jsonwebtoken');
const {response,request} = require('express');
const User = require('../models/user');

const validateJwt = async (req = request, res= response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        //Extraemos el uid
        const {uid} = jwt.verify(token, process.env.SECRET_KEY);

        //obtenemos el usuario autenticado
        const user = await User.findById(uid);

        //Verificar cuenta existente
        if (!user) {
            return res.status(401).json({
                msg: 'Cuenta no existente'
            })
        }

        //Verificar cuenta desactivada
        if(!user.state){
            return res.status(401).json({
                msg: 'Usuario desactivado en DB'
            })
        }

        //Guardamos el usuario autenticado en la request
        req.user = user;

        //Valida el token
        next()

    } catch (error) {

        return res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validateJwt,
}