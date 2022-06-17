const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const documentosTramite = async (idTramite) => {
    try{
        let pool = await sql.connect(sqlConfig);
        const tramitesData = await pool.request().query(`SELECT TRA.tipoTramite, TRDO.isValidado, TIDO.nombre, ARC.idArchivo, ARC.password
                                                        FROM Tramites TRA
                                                        INNER JOIN Tramites_Documentos TRDO ON TRA.idTramites = TRDO.idTramites
                                                        INNER JOIN Documentos DOC ON TRDO.idDocumentos = DOC.idDocumento
                                                        INNER JOIN TipoDocumentos TIDO ON DOC.tipo = TIDO.idTipoDocumento
                                                        INNER JOIN Archivos ARC ON DOC.idArchivo = ARC.idArchivo
                                                        WHERE TRA.idTramites = ${idTramite}`);

        
        const tramites = tramitesData.recordset

        return {
            ok: true,
            cantidad: tramites.length,
            tramites
        }
    }
    catch(error){
        console.log(error)
        return {
            ok: false
        }
    }

}

module.exports = {
    documentosTramite
}