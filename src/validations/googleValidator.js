const {check} = require('express-validator');

const googleValidator = [
    check('id_token','el id_token de Google es necesario').notEmpty(),
]

module.exports = {
    googleValidator
}