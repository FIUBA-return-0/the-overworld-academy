/**
 * realiza validaciones sobre un body vacio, faltante en un contenido o campo con longitud mayor a la permitida
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns undefined. Error 400 en caso de incumplir
 */
const validateSubjectValues = (req, res, next) => {
  if (!req.body) {
      return res.status(400).json({ error: "No se recibió body en la solicitud" });
  }

  const nombre = req.body

  if (nombre.length > 50) {
      return res.status(400).json({ error: "Nombre más largo de lo permitido." });
  }

  next();
};

const validateEmptyEntriesS = (req, res, next) => {
  const { profesor, nombre, carga_horaria, carrera } = req.body

  if (!profesor || !nombre || !carga_horaria || !carrera) {
      return res.status(400).json({"error":"Algun contenido esta vacio, por favor revisa tus entradas"})
  }
  next()
}

const validateQueryParams = async (req, res, next) => {
  const { id, carrera } = req.query;

  if (!id && !carrera) {
    return res
      .status(400)
      .json({ error: "Debe enviar una carrera o una materia." });
  }
  if ((!id && isNaN(carrera)) || (!carrera && isNaN(id))) {
    return res
      .status(400)
      .json({ error: "El parámetro enviado debe ser un id existente." });
  }
  next();
};
module.exports =
  { validateSubjectValues,
  validateEmptyEntriesS,
  validateQueryParams }
