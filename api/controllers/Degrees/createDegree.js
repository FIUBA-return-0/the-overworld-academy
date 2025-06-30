const db = require('../../db.js')

const createDegree = async (body) => {

    const {
        id,
        nombre,
        description,
        duracion,
        sede
    } = body
    const values = [id, nombre, description, duracion, sede]
    const query = `
    INSERT INTO carreras (id,nombre,description,duracion,sede)
    VALUES($1,$2,$3,$4,$5)
    `;
    try {
        const res = await db.query(query, values)
        return {"status":0,res}
    } catch (error) {
        return {"status":1,"error":error.detail}
    }
}

module.exports = createDegree