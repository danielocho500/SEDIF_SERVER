const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

class ServerSedif {
    constructor(){
        this.app = express();
        this.port = 7070
        
        //rutas
        this.estudiantesPath = '/api/estudiantes';
        this.formatosPath = '/api/formatos';
        this.authPath = '/api/auth';
        this.tramitesPath = '/api/tramite'
        this.documentosPath = '/api/documentos'
        this.evaluacionPath = '/api/evaluaciones'

        this.middlewares();
        this.routes();
        this.listen();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(require('body-parser').urlencoded({ extended: false }));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes(){
        this.app.use(this.estudiantesPath, require('../routes/estudiantes'));
        this.app.use(this.formatosPath, require('../routes/formatos'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.tramitesPath, require('../routes/tramites'));
        this.app.use(this.documentosPath, require('../routes/documentos'));
        this.app.use(this.evaluacionPath, require('../routes/evaluacion'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en puerto: "+this.port)
        })
    }
}

module.exports = ServerSedif;