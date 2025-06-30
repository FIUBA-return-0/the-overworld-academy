const db  = require('../../db.js') 
/**
 *  realiza la query a la base de datos para insertar un usuario con los datos brindados
 * @param {object} body debe contener nombre, apellido, rol,username,password
 * @returns devuelve un objeto que representa la entrada completa del nuevo usuario
 */
const createUser = async (body) => {
    
    const {
        nombre,
        apellido,
        rol,
        username,
        password
    } = body
    const values = [nombre, apellido, rol, username, password]

    
    const query = `
        INSERT INTO usuario (nombre,apellido,condicion,username,password)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *
    `;
    try {
        const content = await db.query(query, values)
        
        return {"status":0,"content":content.rows[0]}
    } catch (error) {
        return {"status":1,"content":error.detail}
    }
}

module.exports = createUser