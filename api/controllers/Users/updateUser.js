const db = require('../../db.js');


const updateUser = async (body, id) => {


    const {
        nombre,
        apellido,
        rol,
        username,
        carrera,
        password,
        perfil
    } = body


    const values = [ nombre, apellido, rol, username, carrera, password, perfil, id ]
    const query = `
        UPDATE usuario
        SET nombre = $1,
        apellido = $2,
        condicion = $3,
        username = $4,
        carrera = $5,
        password = $6,
        perfil = $7
        WHERE id = $8
        RETURNING *
    `;
    const res = await db.query(query, values)
    return res.rows[0]
}

module.exports = updateUser