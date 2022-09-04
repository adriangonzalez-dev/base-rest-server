const express = require('express');
const router = express.Router();

//controllers
const {login} = require('../controllers/authController');

//validations
const {authValidator} = require('../validations')

//middlewares
const {catchErrors} = require('../middlewares');

router.post('/',authValidator, catchErrors,login)

module.exports = router