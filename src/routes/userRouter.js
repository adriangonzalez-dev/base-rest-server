const express = require('express');
const router = express.Router();

//Controllers
const {usersGet,usersDelete,usersPatch,usersPost,usersPut} = require('../controllers/usersControllers');

//Validations
const {deleteValidator,idValidator,usersValidator} = require('../validations')

//Middlewares
const {catchErrors, adminRole, validateRole, validateJwt} = require('../middlewares');

//Routes
router.get('/',usersGet);

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