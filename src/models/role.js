const {Schema,model} = require('mongoose');

const RoleSchema = Schema({
    role: {
        type:String,
        required: [true, 'El Rol es necesario']
    }
})

module.exports = model('Role', RoleSchema)