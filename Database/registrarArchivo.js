const sql = require('mssql');
const { generateRandomString } = require('../helpers/generateRandomString');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const registrarArchivoDeTramite = async (idTramite, ruta, tipo) => {
    try{
        let pool = await sql.connect(sqlConfig);
        let resultArchivo = await pool.request()
                       .input('ruta', sql.NVarChar(200),ruta)
                       .input('password', sql.NVarChar(40), generateRandomString(8))
                       .output('idArchivo', sql.Int,)
                       .output('estado', sql.Int)
                       .execute('SPI_Archivo')

        const {idArchivo} = resultArchivo.output

        pool = await sql.connect(sqlConfig);
        let resultDocumento = await pool.request()
                    .input('tipo', sql.Int,tipo)
                    .input('idArchivo', sql.Int, idArchivo)
                    .output('idDocumento', sql.Int,)
                    .output('estado', sql.Int)
                    .execute('SPI_Documento')
        
        
        const {idDocumento} = resultDocumento.output

        pool = await sql.connect(sqlConfig);
        let resultTramite = await pool.request()
                    .input('idTramite', sql.Int, idTramite)
                    .input('idDocumento', sql.Int, idDocumento)
                    .output('estado', sql.Int)
                    .execute('SPI_TRAMITE_DOC')

        return idArchivo;
    }
    catch(err){
        console.log(err)
        return false;
    }
}

module.exports = {
    registrarArchivoDeTramite
}