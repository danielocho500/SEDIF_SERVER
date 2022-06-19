const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const obtenerStatus = async (idTramite) => {
    let pool = await sql.connect(sqlConfig);
    let statusResult = await pool.request().query(`SELECT dbo.fn_getStatusTramite(idTramites) as status
        FROM Tramites WHERE idTramites = ${idTramite}
    `)

    const status = statusResult.recordset[0].status
    return status
}

module.exports = {
    obtenerStatus
}