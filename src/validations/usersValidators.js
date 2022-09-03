const {check} = require('express-validator');
const { validRole, emailExists } = require('../helpers/db-validators');

const usersValidator = [
    check('name','El nombre es obligatorio').notEmpty(),
    check('pass','El password debe ser mayor a 6 caracteres').isLength({min: 6}),
    //check('rol','No es un ron válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom((role)=> validRole(role) ),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom((email)=> emailExists(email) )
]

module.exports = usersValidator