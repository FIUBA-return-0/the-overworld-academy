const db = require("../../db.js");

const updateInscription = async ({ id, condicion }) => {
  const query = `
        update inscripciones i
        set condicion = $1
        where id = $2
        returning id
    `;

  try {
    const result = await db.query(query, [condicion, id]);
    return { status: 0, content: result.rows[0] };
  } catch (error) {
    return { status: 1, content: error.detail };
  }
};

module.exports = updateInscription;
