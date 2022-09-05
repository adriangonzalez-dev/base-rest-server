const express = require('express');
const router = express.Router();

//controllers
const {login, googleSignIn} = require('../controllers/authController');

//validations
const {authValidator, googleValidator} = require('../validations')

//middlewares
const {catchErrors} = require('../middlewares');

router.post('/login',authValidator, catchErrors,login)

router.post('/google',googleValidator, catchErrors,googleSignIn)


module.exports = router