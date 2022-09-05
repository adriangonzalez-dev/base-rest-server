const { request,response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {JwtGenerator} = require('../helpers/JWT-Generator'); 
const { googleVerify } = require('../helpers/googleVerify');
const { json } = require('express/lib/response');

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
    },
    googleSignIn: async (req = request,res = response) =>{

        const {id_token} = req.body;

        try {
            const {name, img, email} = await googleVerify(id_token)

            //Verificar si el usuario existe
            let user = await User.findOne({email})
            //si no existe
            if(!user){
                user = new User({
                    name,
                    email,
                    img,
                    pass: '123abc12',
                    google:true
                })
                await user.save()
            }
            //Si el usuario esta desactivado
            if(!user.state){
                return res.status(401).json({
                    msg: 'El usuario esta desactivado, comuniquse con soporte'
                })
            }
            //si da todo ok, se genera el jwt
            const token = await JwtGenerator(user.id)

            res.json({
                user,
                token
            })

        } catch (error) {
            console.log(error)
            res.status(400).json({
                ok:false,
                msg: 'El token no se pudo verificar'
            })
        }
    }
}