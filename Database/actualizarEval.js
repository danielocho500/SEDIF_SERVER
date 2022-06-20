const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

const actualizarEval = async (idTramite, status, observaciones ) => {
    try{
        let pool = await sql.connect(sqlConfig)
        let eval = await pool.request().query(`UPDATE Evaluaciones SET
                                                status = ${status}, observaciones = ${observaciones}
                                                WHERE idTramite = ${idTramite}`)

        return true
    }
    catch (error) {
        return false
    }
}

module.exports = {
    actualizarEval
}