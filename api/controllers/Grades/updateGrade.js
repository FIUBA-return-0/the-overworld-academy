const db = require("../../db.js");

const updateGrade = async ({ alumno, materia, description, nota }) => {
  const query = `
    update notas n
    set nota = $1
    where n.alumno = $2 and n.materia = $3 and n.description = $4
  `;
  try {
    const result = await db.query(query, [nota, alumno, materia, description]);
    return { status: 0, content: result.rows[0] };
  } catch (error) {
    return { status: 1, content: error.detail };
  }
};

module.exports = updateGrade;
