const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

const getUserBasicData = async (uid) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let user = await pool.request().query(`select * from dbo.Usuarios WHERE uid=${uid}`);
        if(user.rowsAffected[0] != 0){
            if(user.recordset[0].rol == 0){
                const studentData = await pool.request().query(`SELECT rol, nombres, apellidos, nombre as Carrera, nombreRol from dbo.Usuarios US
                                                              INNER JOIN dbo.Estudiantes ES ON US.uid = ES.uid
                                                              INNER JOIN dbo.Programas PR ON PR.idPrograma = ES.programa
                                                              INNER JOIN dbo.Roles RO ON RO.idRol = US.rol
                                                              WHERE US.uid = ${uid}`);
                return studentData
            }
            else{
                const secretaryData = await pool.request().query(`SELECT rol, nombres, apellidos, nombreRol from dbo.Usuarios US
                                                                    INNER JOIN dbo.Secretarias SEC ON US.uid = SEC.uid
                                                                    INNER JOIN dbo.Roles ROL ON ROL.idRol = US.rol
                                                                    WHERE US.uid = ${uid}`)

                return secretaryData
            }
        }
        else{
            return false;
        }
    } 
    catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    getUserBasicData
}