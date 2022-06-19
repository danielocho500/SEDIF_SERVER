const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const subirEvaluacion = async (idTramite, status, observaciones) => {
    try{
        let pool = await sql.connect(sqlConfig);
        let tramite = await pool.request().query(`INSERT INTO Evaluaciones
                                                    (idTramite, status, observaciones)
                                                    Values (${idTramite},${status},'${observaciones}')`);

        return {
            ok: true
        }
    }
    catch (error) {
        return {
            ok: false,
            msg: "error en el servidor"
        };
    }
}

const actualizarEvaluacion = async (idTramite, status, observaciones) => {
    try{
        let pool = await sql.connect(sqlConfig);
        let tramite = await pool.request().query(`UPDATE Evaluaciones SET 
                                                    status = ${status},
                                                    observaciones ='${observaciones}'
                                                    WHERE idTramite = ${idTramite}`);

        return {
            ok: true
        }
    }
    catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: "error en el servidor"
        };
    }
}

module.exports = {
    subirEvaluacion,
    actualizarEvaluacion
}