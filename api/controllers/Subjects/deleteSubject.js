const db = require('../../db.js')

/**
 * Elimina de la base de datos el objeto con el id enviado
 * @param {object} req 
 * @returns devuelve undefined si no se encontró la materia, o el id si se eliminó exitosamente.
 */

const deleteSubject = async (req, res) => {
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

module.exports = deleteSubject