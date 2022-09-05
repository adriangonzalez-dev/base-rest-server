const express = require('express');
const router = express.Router();

//Controllers
const {getCategories} = require('../controllers/categoriesController');

//Validations
const {deleteValidator,idValidator,usersValidator} = require('../validations')

//Middlewares
const {catchErrors, adminRole, validateRole, validateJwt} = require('../middlewares');

//Routes
router.get('/',getCategories);



module.exports = router