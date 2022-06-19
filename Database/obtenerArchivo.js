const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

const getArchivoDB =async (idArchivo) => {
    try{
        let pool = await sql.connect(sqlConfig);
        const archivosResult = await pool.request().query(` SELECT ruta
                            FROM Archivos
                            WHERE idArchivo = ${idArchivo}        
        `)

        return {
            ok: true,
            ruta: archivosResult.recordset[0].ruta
        }
    }
    catch (err) {
        console.log(err)
        return {
            ok: false,
            err
        }
    }
}

module.exports = {
    getArchivoDB
}