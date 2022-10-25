const catchErrors = require('./catchErrors');
const imageVerify = require('./imageVerify');
const validateJwt = require('./validateJWT');
const validateRoles = require('./validateRole');
imageVerify

module.exports = {
    ...catchErrors,
    ...validateJwt,
    ...validateRoles,
    ...imageVerify
}