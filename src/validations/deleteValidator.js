const {check} = require('express-validator');
const {idExists} = require('../helpers/db-validators')

const deleteValidator = [
    check('id','No es un id válido').isMongoId(),
    check('id').custom((id)=> idExists(id)),
]

module.exports = {
    deleteValidator
}