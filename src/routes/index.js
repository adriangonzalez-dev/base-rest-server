const authRouter = require('./authRouter');
const categoriesRouter = require('./categoryRouter');
const productsRouter = require('./productsRouter');
const userRouter = require('./userRouter');
const searchRouter = require('./searchRouter')
const uploadsRouter = require('./uploadsRouter')
module.exports = {
    authRouter,
    categoriesRouter,
    productsRouter,
    userRouter,
    searchRouter,
    uploadsRouter
}