const db = require("../../db.js");

const postGrade = async ({ alumno, materia, description, nota }) => {
  const query = `
        insert into notas (alumno,materia,description,nota)
        values ($1,$2,$3,$4)
        returning *
        `;

  try {
    const result = await db.query(query, [alumno, materia, description, nota]);
    return { status: 0, content: result.rows[0] };
  } catch (error) {
    return { status: 1, content: error.detail };
  }
};

module.exports = postGrade;
