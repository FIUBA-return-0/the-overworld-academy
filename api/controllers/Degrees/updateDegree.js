const db = require('../../db.js');


const updateDegree = async (body, id) => {
    const keys = Object.keys(body);

    for (const campo of keys) {
        const valor = body[campo];
        await db.query(
            `UPDATE carreras SET ${campo} = $1 WHERE id = $2`,
            [valor, id]
        );
    }

    const result = await db.query(`SELECT * FROM carreras WHERE id = $1`, [id]);
    return result.rows[0];
};

module.exports = updateDegree
