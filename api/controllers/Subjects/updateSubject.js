const db = require('../../db.js');


const updateSubject = async (body, id) => {
    const keys = Object.keys(body);

    for (const campo of keys) {
        const valor = body[campo];
        await db.query(
            `UPDATE materias SET ${campo} = $1 WHERE id = $2`,
            [valor, id]
        );
    }

    const result = await db.query(`SELECT * FROM materias WHERE id = $1`, [id]);
    return result.rows[0];
};

module.exports = updateSubject