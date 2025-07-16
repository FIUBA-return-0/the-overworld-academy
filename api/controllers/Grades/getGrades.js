const db = require("../../db.js");

const getNote = async (query) => {
  const keys = Object.keys(query);
  const conditions = [];
  const values = [];

  let queryText = `
    select n.id,u.nombre,u.apellido,u.id as padron, m.nombre as materia,n.description,n.nota from notas n
    join usuario u on u.id = n.alumno 
    join materias m on m.id = n.materia 
  `;

  for (let i = 0; i < keys.length; i++) {
    values.push(query[keys[i]]);
    conditions.push(`n.${keys[i]} = $${i + 1}`);
  }

  queryText += "where " + conditions.join(" and ");

  const result = await db.query(queryText, values);

  return result.rows;
};

module.exports = getNote;