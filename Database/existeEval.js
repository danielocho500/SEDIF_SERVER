const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

const idEval = async (idTramite) => {
    try{
        let pool = await sql.connect(sqlConfig);
        let infoEval = await pool.request().query(`SELECT * FROM Evaluaciones
                                                WHERE idTramite = ${idTramite}`)

        if(infoEval.recordset[0])
            return infoEval.recordset[0].idEvaluacion
        else
            return false
    }
    catch (error) {
        console.log(error)
        return -2
    }
}

module.exports = {
    idEval
}