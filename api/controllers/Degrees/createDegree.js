const db = require('../../db.js')

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