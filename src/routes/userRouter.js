const express = require('express');
const router = express.Router();

const {usersGet,usersDelete,usersPatch,usersPost,usersPut} = require('../controllers/usersControllers');
const usersValidator = require('../validations/usersValidators');
const idValidator = require('../validations/idValidator');
const deleteValidator = require('../validations/deleteValidator');

const {catchErrors} = require('../middlewares/catchErrors');
const {validateJwt} = require('../middlewares/validateJWT');
const {adminRole,validateRole} = require('../middlewares/adminRole')

router.get('/',usersGet)

router.post('/',usersValidator, catchErrors,usersPost)

router.put('/:id',idValidator,catchErrors ,usersPut)

router.patch('/', usersPatch)

router.delete('/:id',
                validateJwt,
                adminRole,
                validateRole('ADMIN_ROLE'),
                deleteValidator ,
                catchErrors,
                usersDelete)

module.exports = router