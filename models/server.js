const express = require('express');
const path = require('path');
const cors = require('cors');
const userRouter = require('../routes/userRouter')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        //paths
        this.usersPath = '/api/users'

        //middlewares
        this.middlewares();

        //mis rutas
        this.routes();
    }

    routes() {
        this.app.use( this.usersPath, userRouter )
    }

    listen() {
        this.app.listen(this.port,()=>{
            console.log(`Servidor abierto en puerto ${this.port}`)
        })
    }

    middlewares() {
        //Directorio público
        this.app.use(express.static(path.join(__dirname,'public')))

        //Lectura y parseo del body
        this.app.use(express.json())

        //CORS
        this.app.use(cors())
    }
}

module.exports = Server