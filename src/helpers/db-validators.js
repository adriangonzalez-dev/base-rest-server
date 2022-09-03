const Role = require('../models/role')
const user = require('../models/user')

const validRole = async (role = '')=>{
    const rolExists = await Role.findOne({role})
    if(!rolExists){
        throw new Error(`El rol ${role} no se encuentra en la Base de datos`)
    }
}

const emailExists = async (email)=>{
    const emailExist = await user.findOne({email})
    if(emailExist){
        throw new Error(`El email ${email} ya se encuentra registrado`)
    }
}

const idExists = async (id)=>{
    const idExist = await user.findById(id)
    if(!idExist){
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
    validRole,
    emailExists,
    idExists
}