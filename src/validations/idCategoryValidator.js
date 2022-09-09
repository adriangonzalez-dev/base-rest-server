const {check} = require('express-validator');
const { idCategoryExist } = require('../helpers/db-validators');

const idCategoryValidator = [
    check('id','No es un id válido').isMongoId(),
    check('id').custom((id)=> idCategoryExist(id))
]

module.exports = {
    idCategoryValidator
};