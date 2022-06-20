const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const obtenerStatus = async (idTramite) => {
    try{
        let pool = await sql.connect(sqlConfig);
        let statusResult = await pool.request().query(`SELECT dbo.fn_getStatusTramite(idTramites) as status
            FROM Tramites WHERE idTramites = ${idTramite}
        `)

        const status = statusResult.recordset[0].status
        return status
    }
    catch(err){
        console.log(err)
        return -1;
    }
}

module.exports = {
    obtenerStatus
}