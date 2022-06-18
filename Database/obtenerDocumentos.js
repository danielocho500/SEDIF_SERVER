const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const obtenerDocumentos = async (idTramite) => {
    try{
        let pool = await sql.connect(sqlConfig);
        const docsData = await pool.request().query(`SELECT  day(fechaCreacion) as dia,MONTH(fechaCreacion) as mes, YEAR(fechaCreacion) as anio, DOC.idDocumento, TIDO.nombre, TIDO.idTipoDocumento,ARC.idArchivo, ARC.password
                FROM Tramites TRA
                INNER JOIN Tramites_Documentos TRDO ON TRA.idTramites = TRDO.idTramites
                INNER JOIN Documentos DOC ON TRDO.idDocumentos = DOC.idDocumento
                INNER JOIN TipoDocumentos TIDO ON DOC.tipo = TIDO.idTipoDocumento
                INNER JOIN Archivos ARC ON DOC.idArchivo = ARC.idArchivo
                WHERE TRA.idTramites = ${idTramite} AND TRA.periodo = '${process.env.PERIODO}'`)

        const documents = docsData.recordset

        return {
            documents
        }

    }
    catch (err) {
        console.log(err)
        return {
            err
        }
    }
}

module.exports = {
    obtenerDocumentos
}