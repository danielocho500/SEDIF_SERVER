require('dotenv').config()

const sqlConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB_NAME,
	server: process.env.SERVER,
	port: 1433,
	trustServerCertificate: true
}

module.exports = {
	sqlConfig
}