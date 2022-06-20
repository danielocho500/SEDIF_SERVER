const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

const obtenerArchivos = async (idTramite) => {
    try{
        let pool = await sql.connect(sqlConfig);
        const arcData = await pool.request().query(`
            SELECT AR.idArchivo, AR.ruta, DOC.tipo FROM Tramites TRA
            INNER JOIN Tramites_Documentos TRDO ON TRA.idTramites = TRDO.idTramites
            INNER JOIN Documentos DOC ON TRDO.idDocumentos = DOC.idDocumento
            INNER JOIN Archivos AR ON DOC.idArchivo = AR.idArchivo
            WHERE TRA.idTramites = ${idTramite}
        `)

        return arcData.recordset
    }
    catch (err) {
        console.log(err)
        return {
            err
        }
    }
}

module.exports = {
    obtenerArchivos
}