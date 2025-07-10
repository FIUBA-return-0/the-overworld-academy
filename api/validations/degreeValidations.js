
/**
 * realiza validaciones sobre un body vacio, faltante en un contenido o campo con longitud mayor a la permitida
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns undefined. Error 400 en caso de incumplir
 */
const validateDegreeValues = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "No se recibió body en la solicitud" });
    }

    const { nombre, sede } = req.body;

    if (nombre.length > 50 || sede.length > 40) {
        return res.status(400).json({ error: "Nombre o sede más largo de lo permitido." });
    }

    next();
};

const validateEmptyEntriesD = (req, res, next) => {
    const { nombre, description, duracion, sede } = req.body;

    if (!nombre || !description || !duracion || !sede) {
        return res.status(400).json({ error: "Algún contenido está vacío, por favor revisa tus entradas" });
    }
    next()
}

module.exports = {validateDegreeValues,validateEmptyEntriesD}