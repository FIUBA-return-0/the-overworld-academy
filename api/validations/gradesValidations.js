const validateGradeValues = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "No se recibió body en la solicitud" });
    }

    const { nota } = req.body

    if(nota <= 0 || isNaN(nota)){
        return res
        .status(400)
        .json({error:"La nota debe ser un número positivo. "})
    }
    next()

}

const validateEmptyEntriesG = (req, res, next) => {
    const { alumno, materia, description, nota } = req.body
    if(!alumno || !materia || !description || !nota){
        return res.status(400).json({ error: "Algún contenido está vacío, por favor revisa tus entradas" })
    }
    next()

}

module.exports = { validateGradeValues, validateEmptyEntriesG}