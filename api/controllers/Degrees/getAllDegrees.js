const db = require("../../db.js")
/**
 * Devuelve todas las carreras disponibles en la base de datos
 * @returns array de objetos donde cada uno es una carrera, si esta vacio, no hay carreras
 */
const getAllDegrees = async () => {

    const query = `
        SELECT * FROM carreras
    `
    const res = await db.query(query)
    return res.rows

}

module.exports = getAllDegrees