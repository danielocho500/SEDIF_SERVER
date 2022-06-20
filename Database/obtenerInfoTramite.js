const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

const getTramite = async (idTramite) => {
    try{
        let pool = await sql.connect(sqlConfig);
        const docsFormatos = await pool.request().query(`SELECT * FROM Tramites
                                                        WHERE idTramites = ${idTramite}
                                                        `)

        return {
            ...docsFormatos.recordset[0],
            err: false
        }
    }
    catch (err) {
        console.log(err)
        return {
            err: true
        }
    }
}

module.exports = {
    getTramite
}