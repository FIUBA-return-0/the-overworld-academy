const db = require("../../db.js");

const deleteSubject = async (req) => {
  const { id } = req.params;

  const query = `
        DELETE FROM materias 
        WHERE id = $1
    `;
  const result = await db.query(query, [id]);

  if (result.rowCount === 0) {
    return undefined;
  }
  return id;
};

module.exports = deleteSubject;
