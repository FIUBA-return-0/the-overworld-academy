const db = require("../../db.js");

const deleteInscription = async ({ id }) => {
  const query = `
        delete from inscripciones i
        where i.id = $1
        returning *
        `;
  await db.query(query, [id]);

  return;
};

module.exports = deleteInscription;
