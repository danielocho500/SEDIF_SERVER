const formatosGet = (req, res) => {
    res.json({
        ok: true,
        formatos: {
            formatoId: 123,
            nombre: "Formato actualización de datos"
        }
    })
}

module.exports = {
    formatosGet
}