const db = require('../../db.js')

/**
 * Elimina de la base de datos el objeto con el id enviado
 * @param {object} req 
 * @returns devuelve undefined si no se encontró el usuario, o el id si se eliminó exitosamente.
 */

const deleteUser = async ({ id }) => {
    const query = `DELETE FROM usuario WHERE id = $1`;
    const result = await db.query(query, [id]);

    if (result.rowCount === 0) {
        return undefined;
    }
    return id;
};


module.exports = deleteUser