const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


module.exports = {
    usersGet: async (req,res = response)=>{

        const {limit = 5, offset = 0} = req.query

        const [total, users] = await Promise.all([
            User.countDocuments({state: true}),
            User.find({state: true})
            .limit(+limit)
            .skip(+offset)
        ])

        res.status(200).json({
            total,
            users
        })
    },

    usersPost: async (req,res = response)=>{

        const {name, email, pass, rol} = req.body

        const usuario = new User( {
            name,
            email,
            pass: bcrypt.hashSync(pass,10),
            rol
        } )

        //Guardar en DB
        await usuario.save()

        res.status(201).json({
            usuario
        })
    },

    usersPut: async (req,res)=>{

        const {id } = req.params;
        const {_id, pass, google, email, ...user} = req.body

        if(pass){
            user.pass = bcrypt.hashSync(pass, 10)
        }

        const userUpdate = await User.findByIdAndUpdate(id, user)

        res.status(201).json({
            userUpdate
        })
    },

    usersPatch: (req,res)=>{
        res.status(201).json({
            msg: 'patch API - desde controllers'
        })
    },

    usersDelete: async (req,res)=>{

        const {id} = req.params;

        //Eliminar fisicamente
        //const user = await User.findByIdAndDelete(id);

        //Eliminar solo referencia
        const user = await User.findByIdAndUpdate(id, {state:false});

        res.status(201).json({
            user
        })
    }

}