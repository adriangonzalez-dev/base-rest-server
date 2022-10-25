const {response} = require('express');
const { uploadFiles } = require('../helpers');
const {Product,User} = require('../models')
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'ecommerce-tea', 
    api_key: '736727622364223', 
    api_secret: '4WQg3CgSBjymW8snjgZ0EJDUyR0', 
})

module.exports = {
    uploadFiles:async (req,res= response)=> {

        try {
          const fileName = await uploadFiles(req.files,undefined,'img')

          res.json({
            file: fileName
          })

        } catch (error) {
          res.status(400).json({error})
        }
    },
    
    updateImage:async(req,res=response)=>{
      const {coleccion, id} = req.params;

      let modelo;

      switch (coleccion) {
        case 'users':
          modelo = await User.findById(id);
          if(!modelo){
            return res.status(400).json({
              msg: `No existe el usuario con el id ${id}`
            })
          }
          break;

        case 'products':
          modelo = await Product.findById(id);
          if(!modelo){
            return res.status(400).json({
              msg: `No existe el usuario con el id ${id}`
            })
          }
          break;
      
        default:
          return res.status(500).json({msg: 'Internal server error'})
          break;
      }
      //Verificar si posee imagen
      if(modelo.img){
        //Verificar si existe el archivo imagen
        const pathImage = path.join(__dirname, '../uploads/', coleccion, modelo.img)
        
        if(fs.existsSync(pathImage)){
          fs.unlinkSync(pathImage)
        }
      }

      let fileImg = await uploadFiles(req.files,undefined, coleccion);
      modelo.img = fileImg

      await modelo.save()

      res.json(modelo)
    },
    getImage:async (req, res=response)=> {
      const {coleccion, id} = req.params;

      let modelo;

      switch (coleccion) {
        case 'users':
          modelo = await User.findById(id);
          if(!modelo){
            return res.status(400).json({
              msg: `No existe el usuario con el id ${id}`
            })
          }
          break;

        case 'products':
          modelo = await Product.findById(id);
          if(!modelo){
            return res.status(400).json({
              msg: `No existe el usuario con el id ${id}`
            })
          }
          break;
      
        default:
          return res.status(500).json({msg: 'Internal server error'})
          break;
      }
      //Verificar si posee imagen
      if(modelo.img){
        //Verificar si existe el archivo imagen
        const pathImage = path.join(__dirname, '../uploads/', coleccion, modelo.img)
        
        if(fs.existsSync(pathImage)){
          return res.sendFile(pathImage)
        }
      }

      res.sendFile(path.join(__dirname, '../assets/img/default.jpg'))
    },

    updateImageCloudinary:async(req,res=response)=>{
      const {coleccion, id} = req.params;

      let modelo;

      switch (coleccion) {
        case 'users':
          modelo = await User.findById(id);
          if(!modelo){
            return res.status(400).json({
              msg: `No existe el usuario con el id ${id}`
            })
          }
          break;

        case 'products':
          modelo = await Product.findById(id);
          if(!modelo){
            return res.status(400).json({
              msg: `No existe el usuario con el id ${id}`
            })
          }
          break;
      
        default:
          return res.status(500).json({msg: 'Internal server error'})
          break;
      }
      //Verificar si posee imagen
      if(modelo.img){
        //Verificar si existe el archivo imagen
        const pathImage = modelo.img.split('/')[7].split('.')[0]
        
        await cloudinary.uploader.destroy(pathImage)
      }

      //subir con cloudinary
      const {tempFilePath} = req.files.archivo
      const {secure_url} = await cloudinary.uploader.upload(tempFilePath)

      modelo.img = secure_url

      await modelo.save()

      res.json({modelo})
    },
}