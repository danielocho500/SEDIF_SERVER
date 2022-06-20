const { actualizarEvalCompleto } = require("../Database/actualizarEval")
const { subirEvaluacion, actualizarEvaluacion } = require("../Database/crearEvaluación")
const { idEval } = require("../Database/existeEval")
const { existeTramite, existeTramiteId } = require("../Database/existeTramite")
const { obtenerStatus } = require("../Database/obtenerStatusTramite")
const { obtenerStatusTipo } = require("../Database/obtenerTipoTramite")


const postEvaluacion = async (req, res) => {
    const {idTramite} = req.params
    const {valido, observaciones} = req.body

    const id = await idEval(idTramite)

    console.log("id: "+id)

    if(id == -2)
        return res.status(500).json({
            ok:false,
            msg: "error en el servidor"
        })

    if (!existeTramiteId(idTramite))
        return res.status(400).json({
            ok: false,
            msg: "No existe el trámite"
        })

    if(id){
        await actualizarEvalCompleto(id,(valido) ? 3 : 2, observaciones)
    }

    let status = await obtenerStatus(idTramite)
    let tipo = await obtenerStatusTipo(idTramite)
    let nuevoStatus;

    
    if(tipo == 1){
        nuevoStatus = (valido) ? 3 : 2
    }


    else if (tipo ==  2){
        switch(status){
            case 0:
                nuevoStatus = (valido) ? 2 : 4
                break;
            case 2:
                nuevoStatus = (valido) ? 3 : 2
                break;
            case 4:
                nuevoStatus = (valido) ? 2 : 4
                break;
        }
    }

    else if(tipo == 3){
        switch(status){
            case 0:
                nuevoStatus = (valido) ? 2 : 5
                break;
            case 2:
                nuevoStatus = (valido) ? 3 : 2
                break;
            case 5:
                nuevoStatus = (valido) ? 2 : 5
                break;
        }
    }

    let respEval;

    if (status == 0)
        respEval = await subirEvaluacion(idTramite, nuevoStatus, observaciones)
    else
        respEval = await actualizarEvaluacion(idTramite, nuevoStatus, observaciones)


    return res.json({
        ...respEval
    })
} 

module.exports = {
    postEvaluacion
}