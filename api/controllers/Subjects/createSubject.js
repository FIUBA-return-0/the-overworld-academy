const db  = require('../../db.js') 

const createSubject = async (body) => {
    
    const {
        profesor,
        nombre,
        carga_horaria,
        carrera
    } = body
    const values = [profesor, nombre, carga_horaria, carrera]

    
    const query = `
        INSERT INTO usuario (profesor,nombre,carga_horaria,carrera)
        VALUES($1,$2,$3,$4)
        RETURNING *
    `;
    try {
        const content = await db.query(query, values)
        
        return {"status":0,"content":content.rows[0]}
    } catch (error) {
        return {"status":1,"content":error.detail}
    }
}

module.exports = createSubject