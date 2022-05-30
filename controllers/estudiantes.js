const estudiantesGet = (req, res) => {
    res.json({
        ok: true,
        estudiantes: [
            {
                "studentId": 123,
                "nombre": "Raúl",
                "apellidos": "Peredo Estudillo"
            },
            {
                "studentId": 124,
                "nombre": "Daniel",
                "apellidos": "Díaz Rossell"
            }
        ]
    })
}

module.exports = {
    estudiantesGet
}