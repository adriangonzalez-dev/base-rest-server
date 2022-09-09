const express = require('express');
const router = express.Router();

//helpers
const {idCategoryExist} = require('../helpers/db-validators');

//midlewares
const {catchErrors, validateJwt,adminRole} = require('../middlewares');

//controllers
const {getCategories,getCategoryById,createCategory,updateCategory,deleteCategory} = require('../controllers/categoryControllers');

//validations
const {categoryValidator, idCategoryValidator} = require('../validations')

router.get('/', getCategories)

router.get('/:id',
            idCategoryValidator,
            catchErrors,
            getCategoryById)

router.post('/',[ 
    validateJwt,
    categoryValidator,
    catchErrors
],createCategory)

router.put('/:id',
            validateJwt,
            idCategoryValidator,
            categoryValidator,
            catchErrors,
            updateCategory
                        )

router.delete('/:id',
                validateJwt,
                adminRole,
                idCategoryValidator,
                catchErrors,
                deleteCategory)

module.exports = router