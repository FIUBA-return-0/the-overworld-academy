const db = require('../db.js')

/**
 * realiza las validaciones sobre un body vacio, con algun faltante o longitud mayor a la esperada
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns undefined. error 400 si no cumple
 */
const validateUserValues = (req, res, next) => {

    if (!req.body) {
        return res.status(400).json({"error":"no se envio informacion"})
    }    
    const { nombre, apellido, rol} = req.body

    if (nombre.length > 50 || apellido.length >20) {
        return res.status(400).json({ "error": "Nombre o apellido mas largo de lo permitido." })
    }
    if (rol != "alumno" && rol != "profesor" && rol != "director") {
        return res.status(400).json({"error":"un usuario solo puede ser alumno, profesor o director"})
    }
    next()
}

const validateEmptyEntriesU = (req, res, next) => {
    const { nombre, apellido, rol, password } = req.body

    if (!nombre || !apellido || !rol || !password) {
        return res.status(400).json({"error":"Algun contenido esta vacio, por favor revisa tus entradas"})
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

    const condicionOriginal = result.rows[0].condicion
    const condicionNueva = req.body.rol

    if (condicionNueva !== condicionOriginal) {
        if (condicionOriginal !== 'alumno'){
            return res.status(400).json({ error: "Solo se puede actualizar el estado de un alumno." });
        }
        if (condicionNueva === 'alumno') {
            return res.status(400).json({ error: "No se puede cambiar el rol hacia alumno."})
        }
    }

    next()

}
module.exports = {validateUserValues,validateEmptyEntriesU,validateSentCondition,validateChangeCondition}