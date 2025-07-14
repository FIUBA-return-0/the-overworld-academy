const db = require("../../db.js");

const updateGrade = async ({ alumno, materia, description, nota }) => {
  const query = `
    update notas n
    set nota = $1
    where n.alumno = $2 and n.materia = $3 and n.description = $4
    returning *
  `;
  const result = await db.query(query, [nota, alumno, materia, description]);
  return result.rows;
};

module.exports = updateGrade;
