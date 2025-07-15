/**
 * realiza validaciones sobre un body vacio, faltante en un contenido o campo con longitud mayor a la permitida
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns undefined. Error 400 en caso de incumplir
 */
const validateSubjectValues = (req, res, next) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ error: "No se recibió body en la solicitud" });
  }

  const { nombre, foto, carga_horaria } = req.body;

  if (
    carga_horaria !== undefined &&
    (carga_horaria <= 0 || isNaN(carga_horaria))
  ) {
    return res
      .status(400)
      .json({ error: "La carga horaria debe ser un número mayor que 0" });
  }

  if (nombre && nombre.length > 50) {
    return res.status(400).json({ error: "Nombre más largo de lo permitido." });
  }
  if (foto) {
    try {
      new URL(foto);
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Debe enviar una URL de foto válida" });
    }
  }

  next();
};

const validateEmptyEntriesS = (req, res, next) => {
  const { profesor, nombre, carga_horaria, carrera } = req.body;

  if (!profesor || !nombre || !carga_horaria || !carrera) {
    return res
      .status(400)
      .json({
        error: "Algun contenido esta vacio, por favor revisa tus entradas",
      });
  }
  next();
};

const validateQueryParamsS = (req, res, next) => {
  const { id, carrera, profesor } = req.query;

  if (!id && !carrera && !profesor) {
    return res
      .status(400)
      .json({ error: "Debe enviar una carrera o una materia." });
  }

  if (
    (id && isNaN(Number(id))) ||
    (carrera && isNaN(Number(carrera))) ||
    (profesor && isNaN(Number(profesor)))
  ) {
    return res
      .status(400)
      .json({ error: "Los parámetros deben ser IDs numéricos válidos." });
  }

  next();
};

const validateTeacherId = async (req, res, next) => {
  const { profesor } = await req.body;

  if (profesor !== undefined && (profesor <= 0 || isNaN(profesor))) {
    return res
      .status(400)
      .json({
        error: "El id de profesor enviado debe ser un número mayor que 0",
      });
  }
  next();
};

module.exports = {
  validateSubjectValues,
  validateEmptyEntriesS,
  validateQueryParamsS,
  validateTeacherId,
};
