const db = require("../../db.js")

const getAllUsers = async (condition) => {
    const query = `
        SELECT * FROM usuario u
        WHERE u.condicion = $1;
    `
    const values = [condition]
    try {
        const res = await db.query(query, values)
        return res.rows
    } catch (error) {
        return { "error": error.detail }
    }
}


module.exports = getAllUsers