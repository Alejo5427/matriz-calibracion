//Clase servidor en el cual se levantara la API del backend
const { getConnection } = require('../database/config')
const express = require('express')
const cors = require('cors')

class Server {
    
    constructor() {
        //Definicion de express y la variable de entorno 
        this.app = express();
        this.port = process.env.PORT;

        //Definicion de los paths
        this.paths = {
            formulario: '/formulario',
            usuario: '/usuario'
    
        }

        //Conectar la base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();

    }

    async connectDB() {
        //LLamado para conectarse la base de datos y obtener la conexion
        await getConnection();
    }

    middlewares() {
        //Lectura y parseo del body en formato Json
       this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: false}));
        //Uso de los cors
        this.app.use(cors());

    }
    //Las rutas del servidor
    routes() {
        this.app.use(this.paths.formulario, require ('../routes/formulario.routes.js'));
        this.app.use(this.paths.usuario, require ('../routes/usuario.routes.js'));
    }
    
    listen() {
        this.app.listen(this.port,"192.168.7.106", () => {
            console.log('Servidor Escuchando en el puerto:', this.port)
          });
    }


}

module.exports = Server
