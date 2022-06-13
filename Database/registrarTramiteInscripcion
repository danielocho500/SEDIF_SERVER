const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const registrarTramiteInsc = async (uid) => {
    try{
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
                       .input('tipoTramite', sql.Int,2)
                       .input('periodo', sql.NVarChar(30), process.env.PERIODO)
                       .input('uid', sql.Int,uid)
                       .output('idTramite', sql.Int,)
                       .output('estado', sql.Int)
                       .execute('SPI_TRAMITE')

        const {idTramite, estado} = result.output

        return (estado == 1) ? idTramite : false;
    }
    catch(err){
        console.log(err)
        return false;
    }
}

module.exports = {
    registrarTramiteInsc
}