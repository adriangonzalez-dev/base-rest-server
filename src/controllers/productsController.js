const {Product} = require('../models')

module.exports = {
    getProducts: async (req,res)=>{
        const {limit = 5, offset = 0} = req.query
        
        const [total, products] = await Promise.all([

            Product.countDocuments({state:true}),
            Product.find({state:true})
            .populate('category','name')
            .populate('user','name')
            .limit(+limit)
            .skip(+offset)
        ])

        res.status(200).json({
            total,
            products
        })
    },
    getProductsById: async (req,res)=>{
        const {id} = req.params;

        const product = await Product.findById(id)
                                .populate('user','name')
                                .populate('category','name')

        res.json({
            product
        })
    },
    createProduct: async (req,res)=>{

        const properties = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.category._id,
            stock: req.body.stock,
            user: req.user._id
        }

        const product = new Product(properties);

        await product.save()

        res.status(201).json({
            product
        })
    },
    updateProduct: async (req,res)=>{

        const {id} = req.params

        const properties = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.category._id,
            stock: req.body.stock,
            user: req.user._id
        }

        const product = await Product.findByIdAndUpdate(id, properties, {new:true})

        res.status(201).json({
            product
        })
    },

    deleteProduct: async (req,res)=>{

        const {id} = req.params

        const product = await Product.findByIdAndUpdate(id,{state:false})

        res.status(200).json({
            product
        })
    }
}