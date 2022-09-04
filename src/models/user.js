const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    pass:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    img:{
        type: String
    },
    rol:{
        type: String,
        required: true,
        Enum: ['ADMIN_ROLE','USER_ROLE']
    },
    state: {
        type:Boolean,
        default:true
    },
    google: {
        type:Boolean,
        default:false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const{__v, pass, _id, ...user} = this.toObject()

    user.uid = _id
    return {
        user
    }
}

module.exports = model('User', UsuarioSchema)