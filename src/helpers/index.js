const dbValidators = require('./db-validators');
const jwtGenerator = require('./JWT-Generator');
const googleVerify = require('./googleVerify');
const uploadFile = require('./uploadFile')

module.exports = {
    ...dbValidators,
    ...jwtGenerator,
    ...googleVerify,
    ...uploadFile
}