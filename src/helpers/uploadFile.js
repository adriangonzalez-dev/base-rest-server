const path = require('path');
const {v4:uuid} = require('uuid')

const uploadFiles = (files, validExtensions = ['image/png','image/jpg','image/jpeg','image/gif'],folder='') => {
    return new Promise((resolve, reject)=>{
        const {archivo} = files;

          //validar archivo
          if(!validExtensions.includes(archivo.mimetype)){
            return reject(`${archivo.name} no posee una extensión válida`)
          }

          //renombrar archivo
          const tempName = `${uuid()}.${archivo.mimetype.split('/')[1]}`
          const uploadPath = path.join(__dirname,'../uploads/',folder, tempName)

          //mover archivo y guardar
          archivo.mv(uploadPath, (err)=>{
            if (err) {
              reject(err);
            }
        
            resolve(tempName)
          });
    })
}

module.exports ={
    uploadFiles
}