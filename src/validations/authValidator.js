const {check} = require('express-validator');

const authValidator = [
    check('email','El correo es obligatorio').isEmail(),
    check('pass','La contraseña es obligatoria').notEmpty(),
]

module.exports = {
    authValidator
}