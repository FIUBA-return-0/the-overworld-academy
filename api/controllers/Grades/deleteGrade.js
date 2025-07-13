const db = require("../../db.js");

const deleteGrade = async ({ id }) => {
  const query = `
        delete from notas n
        where n.alumno = $1
        returning *
    `;
  const result = await db.query(query, [id]);
  return result.rows;
};

module.exports = deleteGrade;
