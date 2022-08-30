const express = require('express');
const router = express.Router();
const {usersGet,usersDelete,usersPatch,usersPost,usersPut} = require('../controllers/usersControllers')

router.get('/', usersGet)

router.post('/', usersPost)

router.put('/:id', usersPut)

router.patch('/', usersPatch)

router.delete('/', usersDelete)

module.exports = router