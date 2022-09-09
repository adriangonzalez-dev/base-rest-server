const usersValidator = require('./usersValidators');
const idValidator = require('./idValidator');
const deleteValidator = require('./deleteValidator');
const authValidator = require('./authValidator');
const googleValidator = require('./googleValidator');
const categoryValidator = require('./categoryValidator');
const idCategoryValidator = require('./idCategoryValidator');
const productValidator = require('./productValidator');
const idProductValidator = require('./idProductValidator')


module.exports = {
    ...usersValidator,
    ...idValidator,
    ...deleteValidator,
    ...authValidator,
    ...googleValidator,
    ...categoryValidator,
    ...idCategoryValidator,
    ...productValidator,
    ...idProductValidator
}