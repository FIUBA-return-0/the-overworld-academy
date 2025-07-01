const db = require("../../db.js")
/**
 * busca en la base de datos la carrera con el id enviado
 * @param {object} req 
 * @returns devuelve un objeto con la carrera. si el objeto esta vacio, no se encontro la carrera
 */
const getDegree = async (req,res,next) => {
    const { id } = req.params
    
    const query = `
        SELECT * FROM carreras
        WHERE carreras.id = $1
    `

    const resultado = await db.query(query, [id])
    
    return resultado.rows[0]

}

module.exports = getDegree