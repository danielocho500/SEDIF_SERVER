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

    if(!formatoInfo.formato)
        return res.json({
            ok: false,
            msg: 'Formato no existente'
        })

    else 
        return res.json({
            formatoInfo
        })
}

module.exports = {
    formatosGet,
    formatoGet
}