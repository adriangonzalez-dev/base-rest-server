const express = require('express');
const router = express.Router();

const { getProducts,
        getProductsById,
        createProduct,
        updateProduct,
        deleteProduct} = require('../controllers/productsController')

const { catchErrors,
        validateJwt,
        adminRole} = require('../middlewares');

const { productValidator,
        idProductValidator } = require('../validations')

router.get( '/',getProducts )
router.get( '/:id',
            idProductValidator,
            catchErrors,
            getProductsById)

router.post('/',
            validateJwt,
            productValidator,
            catchErrors,
            createProduct)

router.put('/:id', 
            validateJwt,
            idProductValidator,
            productValidator,
            catchErrors,
            updateProduct)

router.delete(  '/:id',
                validateJwt,
                adminRole,
                idProductValidator,
                catchErrors,
                deleteProduct)

module.exports = router