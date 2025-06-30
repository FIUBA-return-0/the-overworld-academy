const db  = require('../../db.js') 

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