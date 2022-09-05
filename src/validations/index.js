const usersValidator = require('./usersValidators');
const idValidator = require('./idValidator');
const deleteValidator = require('./deleteValidator');
const authValidator = require('./authValidator');
const googleValidator = require('./googleValidator');

module.exports = {
    ...usersValidator,
    ...idValidator,
    ...deleteValidator,
    ...authValidator,
    ...googleValidator
}