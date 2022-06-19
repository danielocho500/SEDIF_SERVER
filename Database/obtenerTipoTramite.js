const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const obtenerStatusTipo = async (idTramite) => {
    try{
        let pool = await sql.connect(sqlConfig);
        let statusResult = await pool.request().query(`SELECT tipoTramite FROM Tramites 
                                                        WHERE idTramites = ${idTramite}
                                                    `)

        const tipo = statusResult.recordset[0].tipoTramite
        return tipo
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    obtenerStatusTipo
}