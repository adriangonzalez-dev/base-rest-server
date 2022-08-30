const {response} = require('express')

module.exports = {
    usersGet: (req,res = response)=>{

        const query = req.query

        res.status(200).json({
            msg: 'get API - desde Controllers',
            query
        })
    },

    usersPost: (req,res = response)=>{

        const {name, id} = req.body

        res.status(400).json({
            msg: 'post API - desde Controllers',
            data: {
                name,
                id
            }
        })
    },

    usersPut: (req,res)=>{

        const {id } = req.params

        res.status(201).json({
            msg: 'put API - desde controllers',
            id
        })
    },

    usersPatch: (req,res)=>{
        res.status(201).json({
            msg: 'patch API - desde controllers'
        })
    },

    usersDelete: (req,res)=>{
        res.status(201).json({
            msg: 'delete API - desde controllers'
        })
    }

}