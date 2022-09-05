const express = require('express');
const path = require('path');
const cors = require('cors');
const userRouter = require('../routes/userRouter');
const authRouter = require('../routes/authRouter')
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        //paths
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

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
        this.app.use( this.authPath, authRouter );
        this.app.use( this.usersPath, userRouter )
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
        this.app.use(cors())
    }
}

module.exports = Server