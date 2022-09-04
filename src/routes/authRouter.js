const express = require('express');
const router = express.Router();

const {login} = require('../controllers/authController');

const authValidator = require('../validations/authValidator');
const {catchErrors} = require('../middlewares/catchErrors')

router.post('/',authValidator, catchErrors,login)

module.exports = router