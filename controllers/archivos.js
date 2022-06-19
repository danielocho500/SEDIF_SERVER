const { getArchivoDB } = require("../Database/obtenerArchivo")


const getArchivo = async (req, res) => {
    const {idArchivo} = req.params

    const infoArchivo = await getArchivoDB(idArchivo)

    res.json({
        ...infoArchivo
    })
}

module.exports = {
    getArchivo
}