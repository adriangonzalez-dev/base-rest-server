const catchErrors = require('./catchErrors');
const validateJwt = require('./validateJWT');
const validateRoles = require('./validateRole');

module.exports = {
    ...catchErrors,
    ...validateJwt,
    ...validateRoles,
}