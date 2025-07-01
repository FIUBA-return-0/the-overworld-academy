const db = require("../../db.js")
/**
 * busca en la base de datos la materia con el id enviado
 * @param {object} req 
 * @returns devuelve un objeto con la materia. si el objeto esta vacio, no se encontro la materia
 */
const getSubject = async (req,res,next) => {
    const { id } = req.params
    
    const query = `
        SELECT * FROM materias
        WHERE materias.id = $1
    `

    const resultado = await db.query(query, [id])
    
    return resultado.rows[0]

}

module.exports = getSubject