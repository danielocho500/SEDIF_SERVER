const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const getTramiteEstudiante = async (uid) => {
    try{
        let pool = await sql.connect(sqlConfig);
        const tramiteData = await pool.request().query(`SELECT nombre, periodo, idTramite, DAY(fechaCreacion) AS dia, MONTH(fechaCreacion) AS mes, YEAR(fechaCreacion) AS anio 
                                                        FROM Usuarios US
                                                        INNER JOIN Estudiantes EST ON US.uid = EST.uid
                                                        INNER JOIN Tramite_Estudiante TE ON EST.matricula = TE.matricula
                                                        INNER JOIN Tramites TRA ON TE.idTramite = TRA.idTramites
                                                        INNER JOIN TipoTramites TP ON TRA.tipoTramite = TP.idTipo
                                                        WHERE US.uid = ${uid} AND TRA.periodo = '${process.env.PERIODO}'`);

        if(tramiteData.recordset[0]){
            const {idTramite, periodo, nombre, dia, mes, anio} = tramiteData.recordset[0]

            const evalData = await pool.request().query(`SELECT *
                                                        FROM Tramites TRA 
                                                        INNER JOIN Evaluaciones EVAL ON TRA.idTramites = EVAL.idTramite
                                                        INNER JOIN Status ST ON EVAL.status = ST.idStatus
                                                        WHERE TRA.idTramites = ${idTramite}`)                         
            if(evalData.recordset[0]){
                return {
                    estadoEval: evalData.recordset[0].status,
                    periodo,
                    nombre,
                    dia,
                    mes,
                    anio,
                    observaciones: evalData.recordset[0].observaciones,
                    idTramite
                }
            }
            else{
                return {
                    estadoEval: 0,
                    periodo,
                    nombre,
                    dia,
                    mes,
                    anio,
                    observaciones: "",
                    idTramite
                };
            }

        }
        else
            return {
                estadoEval: 1
            };
         
    }
    catch (error){
        console.log(error)
        return -1;
    }
}

module.exports = {
    getTramiteEstudiante
}