const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

const idEval = async (idTramite) => {
    try{
        let pool = await sql.connect(sqlConfig);
        let infoEval = await pool.request().query(`SELECT * FROM Evaluaciones
                                                WHERE idTramite = ${idTramite}`)

        const {idEvaluacion = false} = infoEval.recordset[0]
        return idEvaluacion
    }
    catch (error) {
        console.log(error)
        return -2
    }
}

module.exports = {
    idEval
}