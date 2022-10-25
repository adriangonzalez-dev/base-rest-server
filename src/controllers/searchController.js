const { response } = require("express");
const { User } = require("../models");
const { ObjectId } = require('mongoose').Types

const validDb = [
    'User',
    'Categoria',
    'Product'
]

const searchUser = async ( key = '', res = response) =>{
    const validMongoId = ObjectId.isValid( key );

    if( validMongoId ) {
        const user = await User.findById( key );
        return  res.json({
            results: user ? [user] : []
        })
    }

    const regex = new RegExp(key, 'i');

    const users = await User.find({
        $or: [{name: regex},{email: regex}],
        $and: [{state:true}]
    })

    res.json({
        results: users
    })
}

const searchProduct = async ( key = '', res = response) =>{
    const validMongoId = ObjectId.isValid( key );

    if( validMongoId ) {
        const user = await User.findById( key );
        return  res.json({
            results: user ? [user] : []
        })
    }

    const regex = new RegExp(key, 'i');

    const users = await User.find({
        $or: [{name: regex},{email: regex}],
        $and: [{state:true}]
    })

    res.json({
        results: users
    })
}

module.exports ={
    search: (req,res)=>{
        const {db, key} = req.params;

        if(!validDb.includes(db)){
            return res.status(400).json({
                msg: 'No es una db permitida'
            })
        }

        switch( db ) {
            case 'User':
                searchUser(key, res)
                break;

            case 'Categoria':
                break;

            case 'Product':
                break;

            default: 
                res.status(500).json({
                    msg: 'No envio argumentos para la búsqueda'
                })
        }

        
    }
}