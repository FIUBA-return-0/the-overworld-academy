const db = require('../db.js')
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

    const { profesor, nombre, carga_horaria, carrera } = req.body;

    if (!profesor || !nombre || !carga_horaria || !carrera) {
        return res.status(400).json({ error: "Algún contenido está vacío, por favor revisa tus entradas" });
    }

    if (nombre.length > 50) {
        return res.status(400).json({ error: "Nombre más largo de lo permitido." });
    }

    next();
};

const validateTeacherId = async (req, res, next) => {
    const { profesor } = req.body;

    const result = await db.query(`
        SELECT * FROM usuario WHERE id = $1
        `,
        [profesor]
    );

    if (result.rowCount === 0) {
        return res.status(400).json({ error: "El profesor no existe" });
    }

    next();
}

const validateDegreeId = async (req, res, next) => {
    const { carrera } = req.body;

    const result = await db.query(`
        SELECT * FROM carreras WHERE id = $1
        `,
        [carrera]
    );

    if (result.rowCount === 0) {
        return res.status(400).json({ error: "La carrera no existe" });
    }

    next();
}

module.exports = (validateSubjectValues, validateTeacherId, validateDegreeId)
