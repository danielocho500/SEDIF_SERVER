const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

require('dotenv').config()

const existeTramite = async (uid) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let tramite = await pool.request().query(`Select * from Usuarios US
            INNER JOIN Estudiantes EST ON US.uid = EST.uid
            INNER JOIN Tramite_Estudiante TE ON EST.matricula = TE.matricula
            INNER JOIN Tramites TRA ON TE.idTramite = TRA.idTramites
            WHERE US.uid = ${uid} AND TRA.periodo = '${process.env.PERIODO}'`);

        return (tramite.rowsAffected[0] != 0)
    } 
    catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    existeTramite
}