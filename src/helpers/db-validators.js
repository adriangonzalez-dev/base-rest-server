const {Role, User, Categoria} = require('../models')

const validRole = async (role = '')=>{
    const rolExists = await Role.findOne({role})
    if(!rolExists){
        throw new Error(`El rol ${role} no se encuentra en la Base de datos`)
    }
}

const emailExists = async (email)=>{
    const emailExist = await User.findOne({email})
    if(emailExist){
        throw new Error(`El email ${email} ya se encuentra registrado`)
    }
}

const idExists = async (id)=>{
    const idExist = await User.findById(id)
    if(!idExist){
        throw new Error(`El id ${id} no existe`)
    }
}

const categoryExists = async (categoryName)=>{
    let category = categoryName.toUpperCase()
    const categoryExist = await Categoria.findOne({name: category})
    if(categoryExist !== null){
        throw new Error(`La categoria ${categoryName} ya se encuentra registrado`)
    }
}

const idCategoryExist = async (id)=>{
    const idExist = await Categoria.findById(id)
    if(!idExist){
        throw new Error(`La categoria con id ${id} no existe`)
    }
}

module.exports = {
    validRole,
    emailExists,
    idExists,
    categoryExists,
    idCategoryExist
}