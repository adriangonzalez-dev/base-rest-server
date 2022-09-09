

module.exports = {
    getProducts: (req,res)=>{
        res.json({
            msg:'productos'
        })
    },
    getProductsById: (req,res)=>{
        res.json({
            msg: 'Producto por id',
            id: req.params.id
        })
    },
    createProduct: (req,res)=>{
        res.json({
            msg: 'Crear producto'
        })
    },
    updateProduct: (req,res)=>{
        res.json({
            msg: 'Actualizar producto',
            id: req.params.id
        })
    },
    deleteProduct: (req,res)=>{
        res.json({
            msg: 'Eliminar productos',
            id: req.params.id
        })
    }
}