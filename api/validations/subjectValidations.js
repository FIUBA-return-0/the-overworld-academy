
/**
 * realiza validaciones sobre un body vacio, faltante en un contenido o campo con longitud mayor a la permitida
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns undefined. Error 400 en caso de incumplir
 */
const validateCreateSubject = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "No se recibió body en la solicitud" });
    }

    const { profesor, nombre, carga_horaria, carrera } = req.body;

    if (!profesor || !nombre || !carga_horaria || !carrera) {
        return res.status(400).json({ error: "Algún contenido está vacío, por favor revisa tus entradas" });
    }

    if (nombre.length > 50) {
        return res.status(400).json({ error: "Nombre más largo de lo permitido." });
    }

    next();
};

module.exports = validateCreateSubject