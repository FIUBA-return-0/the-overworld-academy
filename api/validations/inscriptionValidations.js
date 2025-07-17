const validateQueryParamsI = async (req, res, next) => {
  const { usuario, materia } = req.query;

  if (!usuario && !materia) {
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
};

const validateStudentCondition = async (req, res, next) => {
  const { condicion } = req.query;
  if (condicion != "aprobado" || condicion != "cursando") {
    return res
      .status(400)
      .json({ error: "El parámetro enviado debe ser aprobado o cursando." });
  }
  next();
};

const validateEmptyBodyI = async (req, res, next) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ error: "No se recibió body en la solicitud" });
  }
  next();
};

const validateEmptyEntriesI = (req, res, next) => {
  const { alumno, materia, condicion } = req.body;

  if (!alumno || !materia || !condicion) {
    return res.status(400).json({
      error: "Algun contenido esta vacio, por favor revisa tus entradas",
    });
  }
  next();
};
module.exports = {
  validateQueryParamsI,
  validateStudentCondition,
  validateEmptyBodyI,
  validateEmptyEntriesI,
};
