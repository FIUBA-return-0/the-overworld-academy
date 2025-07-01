const db = require('../../db.js')

const deleteDegree = async (req, res) => {
    const { id } = req.params

    const query = `
        DELETE FROM carreras 
        WHERE id = $1
    `
    const result = await db.query(query, [id])

    if(result.rowCount === 0){
        return undefined;
    }
    return id;
}

module.exports = deleteDegree