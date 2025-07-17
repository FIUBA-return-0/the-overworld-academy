const db = require("../../db.js");

const postGrade = async ({ alumno, materia, description, nota }) => {
  let values = [alumno, materia, description];
  if (!nota) {
    values.unshift(null);
  } else {
    values.unshift(nota);
  }
  const query = `
        insert into notas (nota,alumno,materia,description)
        values ($1,$2,$3,$4)
        returning *
        `;

  try {
    const result = await db.query(query, values);
    console.log(result.rows[0])
    return { status: 0, content: result.rows[0] };
  } catch (error) {
    return { status: 1, content: error.detail };
  }
};

module.exports = postGrade;
