const validateGradeValues = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "No se recibió body en la solicitud" });
    }

    const { nota } = req.body

    if(nota <= 0|| nota > 10 || isNaN(nota)){
        return res
        .status(400)
        .json({error:"La nota debe ser un número entre 0 y 10. "})
    }
    next()

}

const validateEmptyEntriesG = (req, res, next) => {
    const { alumno, materia, description, nota } = req.body
    if(alumno == null || materia == null || description == null || nota == null){
        return res.status(400).json({ error: "Algún contenido está vacío, por favor revisa tus entradas" })
    }
    next()

}


const validateStudentId = async (req, res, next) => {

    const { alumno } = await req.body;
  
    if(alumno !== undefined && (alumno <= 0 || isNaN(alumno))){
        return res.status(400).json({error: 'El id de alumno enviado debe ser un número mayor que 0'})
    }
    next()
  }

const validateSubjectId = async (req, res, next) => {

const { materia } = await req.body;

if(materia !== undefined && (materia <= 0 || isNaN(materia))){
    return res.status(400).json({error: 'El id de materia enviado debe ser un número mayor que 0'})
}
next()
}
  
  

  
  

module.exports = { validateGradeValues, validateEmptyEntriesG, validateStudentId, validateSubjectId}