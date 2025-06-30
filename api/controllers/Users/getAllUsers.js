const db = require("../../db.js")

const getAllUsers = async (rol) => {
    const query = `
        SELECT * FROM usuario u
        WHERE u.condicion = $1;
    `
    const values = [rol]
    try {
        const res = await db.query(query, values)
        return res.rows
    } catch (error) {
        return { "error": error.detail }
    }
}


module.exports = getAllUsers