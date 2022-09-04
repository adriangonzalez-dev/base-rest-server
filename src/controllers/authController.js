const { response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {JwtGenerator} = require('../helpers/JWT-Generator'); 

module.exports = {
    login: async (req,res = response)=>{

        const { email, pass } = req.body;
        const user = await User.findOne({ email: email});

        //Verificar email 
        if(!user){
            return res.status(400).json({
                msg: 'Usuario o clave no son válidos - email'
            })
        }

        //Verificar status
        if(!user.state){
            return res.status(400).json({
                msg: 'Usuario o clave no son válidos - usuario desactivado'
            })
        }

        //Verificar password
        const password = bcrypt.compareSync(pass, user.pass)
        if(!password){
            return res.status(400).json({
                msg: 'Usuario o clave no son válidos - contraseña'
            })
        }

        //Generar JWT
        const token = await JwtGenerator(user.id)

        res.json({
            user,
            token
        })
    }
}