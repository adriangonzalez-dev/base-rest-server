const {check} = require('express-validator');
const { idProductExist } = require('../helpers/db-validators');

const idProductValidator = [
    check('id','No es un id válido').isMongoId(),
    check('id').custom((id)=> idProductExist(id))
]

module.exports = {
    idProductValidator
};