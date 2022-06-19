const { getFormatos, getFormato } = require("../Database/obtenerFormatos")

const formatosGet = async (req, res) => {

    const formatosInfo = await getFormatos();

    res.json({
        ...formatosInfo
    })
}

const formatoGet = async (req, res) => {
    const {idFormato} = req.params

    const formatoInfo = await getFormato(idFormato);

    res.json({
        formatoInfo
    })
}

module.exports = {
    formatosGet,
    formatoGet
}