const db = require("../../db.js")

const getDegree = async (req,res,next) => {
    const { id } = req.params
    
    const query = `
        SELECT * FROM carreras
        WHERE carreras.id = $1
    `

    const resultado = await db.query(query, [id])
    
    return resultado.rows

}

module.exports = getDegree