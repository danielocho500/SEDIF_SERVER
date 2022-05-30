const express = require('express');
const cors = require('cors');

class ServerSedif {
    constructor(){
        this.app = express();
        this.port = 7070
        
        //rutas
        this.estudiantesPath = '/api/estudiantes';
        this.formatosPath = '/api/formatos';
        this.authPath = '/api/auth'

        this.middlewares();
        this.routes();
        this.listen();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(require('body-parser').urlencoded({ extended: false }));
    }

    routes(){
        this.app.use(this.estudiantesPath, require('../routes/estudiantes'));
        this.app.use(this.formatosPath, require('../routes/formatos'));
        this.app.use(this.authPath, require('../routes/auth'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en puerto: "+this.port)
        })
    }
}

module.exports = ServerSedif;