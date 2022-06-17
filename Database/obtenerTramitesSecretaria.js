const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const obtenerTramiteSecretariaBD = async (uid, estado) => {
    try{
        let pool = await sql.connect(sqlConfig);
        const tramitesData = await pool.request().query(`SELECT SEC.uid as secretariaID,EST.matricula, EST.nombres, EST.apellidos, EST.semestre, PRO.nombre AS carrera, TRA.idTramites, TT.nombre, TT.idTipo, TRA.periodo, YEAR(TRA.fechaCreacion) as anio, MONTH(TRA.fechaCreacion) as mes, DAY(TRA.fechaCreacion) as dia,dbo.fn_getStatusTramite(TRA.idTramites) AS estado
                                                        FROM Usuarios US
                                                        INNER JOIN Secretarias SEC ON US.uid = SEC.uid
                                                        INNER JOIN Secretarias_Estudiantes SE ON SEC.noPersonal = SE.noPersonal
                                                        INNER JOIN Estudiantes EST ON SE.matricula = EST.matricula
                                                        INNER JOIN Tramite_Estudiante TE ON EST.matricula = TE.matricula
                                                        INNER JOIN Tramites TRA ON TE.idTramite = TRA.idTramites
                                                        INNER JOIN Programas PRO ON EST.programa = PRO.idPrograma
                                                        INNER JOIN TipoTramites TT ON TRA.tipoTramite = TT.idTipo
                                                        WHERE dbo.fn_getStatusTramite(TRA.idTramites) = ${estado} AND SEC.uid = ${uid} AND TRA.periodo = '${process.env.PERIODO}'`);

        
        const tramites = tramitesData.recordset

        return tramites
        
    }
    catch(error){
        console.log(error)
        return []
    }
}

module.exports = {
    obtenerTramiteSecretariaBD
}