const {check} = require('express-validator');
const { validCategory } = require('../helpers/db-validators')

const productValidator = [
    check('name','El nombre es obligatorio').notEmpty(),
    check('category').custom(category => validCategory(category)),
]

module.exports = {
    productValidator
}