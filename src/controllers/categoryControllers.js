const { response } = require('express')
const {Categoria} = require('../models')

module.exports = {

    getCategories: async (req,res)=>{
        
        const {limit = 5, offset = 0} = req.query
        
        const [total, categories] = await Promise.all([

            Categoria.countDocuments({state:true}),
            Categoria.find({state:true})
            .populate('user','name')
            .limit(+limit)
            .skip(+offset)
        ])

        res.status(200).json({
            total,
            categories
        })
    },

    getCategoryById: async (req,res)=>{
        const {id} = req.params;

        const category = await Categoria.findById(id)
                                .populate('user','name')

        res.json({
            category
        })
    },

    createCategory: async(req,res)=>{
        const name = req.body.name.toUpperCase()

        const data = {
            name,
            user: req.user._id
        }
        const category = new Categoria(data)
        
        await category.save()

        res.status(201).json({
            category
        })
    
    },

    updateCategory: async(req,res)=>{
        const {id} = req.params;

        const name = req.body.name.trim().toUpperCase();

        const data = {
            name,
            user:req.user._id
        }

        const updateCategory = await Categoria.findByIdAndUpdate(id,data,{new:true});

        res.status(201).json({
            updateCategory
        })
    },

    deleteCategory: async (req,res)=>{
        const {id} = req.params

        const categoryDelete = await Categoria.findByIdAndUpdate(id,{state: false});


        res.status(200).json({
            "categoria eliminada": categoryDelete
        })
    }

}