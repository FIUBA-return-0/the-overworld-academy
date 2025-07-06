const db = require('../db.js')

/**
 * realiza las validaciones sobre un body vacio, con algun faltante o longitud mayor a la esperada
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns undefined. error 400 si no cumple
 */
const validateCreateUser = (req, res, next) => {

    if (!req.body) {
        return res.status(400).json({"error":"no se envio informacion"})
    }    
    const { nombre, apellido, rol, password } = req.body

    if (!nombre || !apellido || !rol || !password) {
        return res.status(400).json({"error":"Algun contenido esta vacio, por favor revisa tus entradas"})
    }

    if (nombre.length > 50 || apellido.length >20) {
        return res.status(400).json({ "error": "Nombre o apellido mas largo de lo permitido." })
    }
    if (rol != "alumno" && rol != "profesor" && rol != "director") {
        return res.status(400).json({"error":"un usuario solo puede ser alumno, profesor o director"})
    }
    next()
}
/**
 * chequea si el rol enviado es profesor,alumno o director.
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns undefined. Tira error 400 de lo contrario
 */
const validateSentCondition = (req, res, next) => {
    const {rol} = req.query
    if (rol != 'alumno' && rol != 'profesor' && rol != 'director') {
        return res.status(400).json({"error":"la condicion debe ser valida"})
    }
    next()
}
const validateChangeCondition = async (req, res, next) => {
    const { id } = req.params;

    const result = await db.query('SELECT condicion FROM usuario WHERE id = $1', [id]);

    const condicion = result.rows[0].condicion

    if (condicion !== 'alumno') {
        return res.status(400).json({ error: "Solo se puede actualizar el estado de un alumno." });
    }

    next()

}
module.exports = {validateCreateUser,validateSentCondition,validateChangeCondition}