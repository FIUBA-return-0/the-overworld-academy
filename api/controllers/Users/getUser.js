const db = require("../../db.js")

const getUser = async (req,res,next) => {
    const { id } = req.params
    const query = `
        SELECT * FROM usuario u
        WHERE u.id = $1
    `

    const resultado = await db.query(query, [id])
    return {"status":0,"res":resultado}

}

module.exports = getUser