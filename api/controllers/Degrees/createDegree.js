const db = require('../../db.js')
/**
 * Inserta en la base de datos la carrera con los datos brindados
 * @param {object} body debe tener nombre,description,duracion,sede
 * @returns un objeto con la primer key "status" si esta es 1, el campo content es la informacion de la carrera, de lo contrario es el mensaje de error
 */
const createDegree = async (body) => {

    const {
        nombre,
        description,
        duracion,
        sede
    } = body
    const values = [ nombre, description, duracion, sede]
    const query = `
        INSERT INTO carreras (nombre,description,duracion,sede)
        VALUES($1,$2,$3,$4)
        RETURNING *
    `;
    try {
        const res = await db.query(query, values)
        return {"status":0,"content":res.rows[0]}
    } catch (error) {
        return {"status":1,"content":error.detail}
    }
}

module.exports = createDegree