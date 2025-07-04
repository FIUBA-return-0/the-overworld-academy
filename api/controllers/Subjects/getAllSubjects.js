const db = require("../../db.js")
/**
 * Devuelve todas las materias disponibles en la base de datos
 * @returns array de objetos donde cada uno es una carrera, si esta vacio, no hay carreras
 */
const getAllSubjects = async () => {

    const query = `
        SELECT * FROM materias
    `
    const res = await db.query(query)
    return res.rows

}

module.exports = getAllSubjects