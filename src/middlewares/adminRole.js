const {response, request} = require('express');

const adminRole = (req = request, res = response, next) => {
    if(!req.user){
         return res.status(500).json({
            msg: 'Primero se debe validar el token'
         })
    }

    const {rol,name} = req.user

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no tiene permisos de administrador`
        })
    }

    next()
}

const validateRole = (...roles) =>{
    return (req = request, res = response, next) => {
        if(!req.user){
            return res.status(500).json({
               msg: 'Primero se debe validar el token'
            })
       }

       if(!roles.includes(req.user.rol)){
        return res.status(401).json({
            msg: `El servicio require uno de los siguientes roles: ${roles}`
        })
       }
    }
}

module.exports = {
    adminRole,
    validateRole
}