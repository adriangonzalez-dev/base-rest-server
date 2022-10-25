const {Router} = require('express');
const { uploadFiles,updateImage,getImage,updateImageCloudinary } = require('../controllers/uploadsController');
const { check } = require('express-validator')

const {catchErrors, imageVerify} = require('../middlewares');
const { ValidCollection } = require('../helpers');

const router = Router();

router.post('/',imageVerify, uploadFiles);

router.put('/:coleccion/:id',[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(col=>ValidCollection(col,['users','products'])),
    catchErrors
],imageVerify,/* updateImage */updateImageCloudinary);

router.get('/:coleccion/:id',[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(col=>ValidCollection(col,['users','products'])),
    catchErrors
],getImage)

module.exports = router;