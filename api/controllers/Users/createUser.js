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
    `;
    try {
        const res = await db.query(query, values)
        return {"status":0,res}
    } catch (error) {
        return {"status":1,"error":error.detail}
    }
}

module.exports = createUser