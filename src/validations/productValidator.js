const {check} = require('express-validator');

const productValidator = [
    check('name'),
    check('price'),
    check('category'),
    check('description'),
    check('stock')
]

module.exports = {
    productValidator
}

/*
name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    description: {
        type: String
    },
    stock: {
        type: Boolean,
        default: true
    } */