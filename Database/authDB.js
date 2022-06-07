const sql = require('mssql');
const { sqlConfig } = require('../models/databaseConfig');
const { checkPassword } = require('../helpers/password');

const authUserGetUID = async (email, password) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let user = await pool.request().query(`SELECT * from dbo.Usuarios WHERE email='${email}'`);
        
        if(user.rowsAffected[0] != 0){
            const actualPassword = user.recordset[0].password;
            if (checkPassword(password, actualPassword) )
                return user.recordset[0].uid
            else
                return false
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
    authUserGetUID
}