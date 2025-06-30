const db = require("../../db.js")
/**
 * busca en la base de datos todos los usuarios que tengan asignado el rol enviado
 * @param {string} rol alumno,profesor o director
 * @returns array de objetos. si el array esta vacio, no se encontraron usuarios
 */
const getAllUsers = async (rol) => {
    const query = `
        SELECT * FROM usuario u
        WHERE u.condicion = $1;
    `
    const values = [rol]
    const res = await db.query(query, values)
    return res.rows
}


module.exports = getAllUsers