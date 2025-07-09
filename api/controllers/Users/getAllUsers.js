const db = require("../../db.js")
/**
 * busca en la base de datos todos los usuarios que tengan asignado el rol enviado
 * @param {string} rol alumno,profesor o director
 * @returns array de objetos. si el array esta vacio, no se encontraron usuarios
 */
const getAllUsers = async (rol) => {
    const query = `
        select 	
            u.id,
            u.nombre,
            u.apellido,
            u.condicion,
            u.username,
            c.nombre as carrera,
            u.password,
            u.foto,
            u.bio
        from usuario u
        join carreras c 
        on u.carrera = c.id
        where condicion = $1
    `
    const values = [rol]
    const res = await db.query(query, values)
    return res.rows
}


module.exports = getAllUsers