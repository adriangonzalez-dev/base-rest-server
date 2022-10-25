const express = require('express');
const router = express.Router();

const {search} =  require('../controllers/searchController');

router.get('/:db/:key', search)

module.exports = router;