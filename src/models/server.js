const express = require('express');
const path = require('path');
const cors = require('cors');
const {authRouter,userRouter,productsRouter,categoriesRouter,searchRouter,uploadsRouter } = require('../routes');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        //paths
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            users: '/api/users',
            uploads: '/api/uploads'
        }

        //Database Connection
        this.connectDB()

        //middlewares
        this.middlewares();

        //mis rutas
        this.routes();
    }

    async connectDB() {
        await dbConnection()
    }

    routes() {
        this.app.use( this.paths.auth, authRouter );
        this.app.use( this.paths.categories, categoriesRouter );
        this.app.use( this.paths.products, productsRouter);
        this.app.use( this.paths.search, searchRouter);
        this.app.use( this.paths.users, userRouter );
        this.app.use( this.paths.uploads, uploadsRouter );
    }

    listen() {
        this.app.listen(this.port,()=>{
            console.log(`Servidor abierto en puerto ${this.port}`)
        })
    }

    middlewares() {
        //Directorio público
        this.app.use(express.static(path.join(__dirname,'../../public')))

        //Lectura y parseo del body
        this.app.use(express.json())

        //CORS
        this.app.use(cors());
        
        //npm install express-fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
}

module.exports = Server