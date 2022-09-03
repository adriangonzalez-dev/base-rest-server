const {check} = require('express-validator');
const {idExists, validRole} = require('../helpers/db-validators')

const idValidator = [
    check('id','No es un id válido').isMongoId(),
    check('id').custom((id)=> idExists(id)),
    check('rol').custom((role)=> validRole(role) )
]

module.exports = idValidator