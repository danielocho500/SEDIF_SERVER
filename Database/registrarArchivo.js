const sql = require('mssql');
const { generateRandomString } = require('../helpers/generateRandomString');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const registrarArchivoDeTramite = async (idTramite, ruta, tipo) => {
    try{
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
                       .input('ruta', sql.NVarChar(200),ruta)
                       .input('password', sql.NVarChar(40), generateRandomString(8))
                       .output('idArchivo', sql.Int,)
                       .output('estado', sql.Int)
                       .execute('SPI_Archivo')


        const {idArchivo} = result.output

        pool = await sql.connect(sqlConfig);
        result = await pool.request()
                    .input('tipo', sql.Int,tipo)
                    .input('idArchivo', sql.Int, idArchivo)
                    .output('idDocumento', sql.Int,)
                    .output('estado', sql.Int)
                    .execute('SPI_Documento')

        const {idDocumento} = result.output

        pool = await sql.connect(sqlConfig);
        result = await pool.request()
                    .input('idTramite', sql.Int, idTramite)
                    .input('idDocumento', sql.Int, idDocumento)
                    .output('estado', sql.Int)
                    .execute('SPI_TRAMITE_DOC')

        const {estado} = result.output

        return (estado == 1) ? idTramite : false;
    }
    catch(err){
        console.log(err)
        return false;
    }
}

module.exports = {
    registrarArchivoDeTramite
}