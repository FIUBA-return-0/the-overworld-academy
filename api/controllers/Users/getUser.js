const db = require("../../db.js")

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @returns devuelve un objeto que representa al usuario, un objeto vacio o undefined indica que no se encontro el usuario
 */
const getUser = async (req,res) => {
    const { id } = req.params
    
    const query = `
        SELECT * FROM usuario u
        WHERE u.id = $1
    `

    const resultado = await db.query(query, [id])
    
    return resultado.rows[0]


}

module.exports = getUser