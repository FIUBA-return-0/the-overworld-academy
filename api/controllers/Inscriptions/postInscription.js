const db = require("../../db.js");

const postInscription = async ({ alumno, materia, condicion }) => {
  const query = `
      insert into inscripciones (alumno,materia,condicion)
      values ($1,$2,$3)
      returning id
    `;
  try {
    const result = await db.query(query, [alumno, materia, condicion]);
    return { status: 0, content: result.rows[0] };
  } catch (error) {
    return { status: 1, content: error.detail };
  }
};

module.exports = postInscription;
