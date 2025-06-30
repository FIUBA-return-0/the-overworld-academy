const db = require("../../db.js")

const getAllDegrees = async () => {

    const query = `
        SELECT * FROM carreras
    `

    try {
        const res = await db.query(query)
        return res.rows
    } catch(error) {
        return {"error":error.detail}
    }

}

module.exports = getAllDegrees