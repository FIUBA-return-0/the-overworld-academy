const db  = require('../../db.js') 

const createUser = async (body) => {
    
    const {
        nombre,
        apellido,
        id,
        rol,
        username,
        carrera,
        password
    } = body
    const values = [nombre, apellido, id, rol, username,carrera,password]
    const query = `
        INSERT INTO usuario (nombre,apellido,id,condicion,username,carrera,password)
        VALUES($1,$2,$3,$4,$5,$6,$7)
    `;
    try {
        const res = await db.query(query, values)
        return {"status":0,res}
    } catch (error) {
        return {"status":1,"error":error.detail}
    }
}

module.exports = createUser