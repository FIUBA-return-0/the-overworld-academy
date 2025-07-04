const db = require('../../db.js')


const updateSubject = async (body, id) => {


    const {
        profesor,
        nombre,
        carga_horaria,
        carrera
    } = body

    const values = [ profesor, nombre, carga_horaria, carrera, id ]
    const query = `
        UPDATE materias
        SET profesor = $1,
        nombre = $2,
        carga_horaria = $3,
        carrera = $4
        WHERE id = $5
        RETURNING *
    `;
    const res = await db.query(query, values)
    return res.rows[0]
}

module.exports = updateSubject