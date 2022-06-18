const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');

const getFormatos = async () => {
    try{
        let pool = await sql.connect(sqlConfig);
        const docsFormatos = await pool.request().query(`
                                                        SELECT *
                                                        FROM Formatos
                                                    `)
        return {
            ok: true,
            formatos: docsFormatos.recordset
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
    getFormatos
}