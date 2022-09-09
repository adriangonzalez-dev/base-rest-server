const {check} = require('express-validator');
const {categoryExists} = require('../helpers/db-validators')

const categoryValidator = [
    check('name', 'El nombre es requerido').notEmpty(),
    check('name').custom((name)=>categoryExists(name))
]

module.exports = {
    categoryValidator
}