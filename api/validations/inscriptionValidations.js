const validateQueryParamsI = async (req, res, next) => {
    const { usuario, materia } = req.query;
  
    if ((!usuario && !materia)||(usuario && materia)) {
      return res
        .status(400)
        .json({ error: "Debe enviar un usuario o una materia." });
    }
    if ((!usuario && isNaN(materia)) || (!materia && isNaN(usuario))) {
      return res
        .status(400)
        .json({ error: "El parámetro enviado debe ser un id existente." });
    }
    next();
}

const validateStudentCondition = async (req, res, next) => {
  const { condicion } = req.query;
  if(condicion!='aprobado' || condicion!='cursando'){
    return res
    .status(400)
    .json({ error: "El parámetro enviado debe ser aprobado o cursando."})
  }
}
module.exports = {validateQueryParamsI, validateStudentCondition}