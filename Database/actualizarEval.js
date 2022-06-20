const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

const actualizarEval = async (idTramite,status) => {
    try{
        let pool = await sql.connect(sqlConfig)
        let eval = await pool.request().query(`UPDATE Evaluaciones SET
                                                status = ${status}
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