const { getFormatos } = require("../Database/obtenerFormatos")

const formatosGet = async (req, res) => {

    const formatosInfo = await getFormatos();

    console.log(formatosInfo)

    res.json({
        ...formatosInfo
    })
}

module.exports = {
    formatosGet
}