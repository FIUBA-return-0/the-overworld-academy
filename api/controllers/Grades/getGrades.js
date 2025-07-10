const db = require("../../db.js");

const getNote = async (body) => {
  const keys = Object.keys(body);
  const conditions = [];
  const values = [];

  let query = `
    select n.id,u.nombre,u.apellido,m.nombre as materia,n.description,n.nota from notas n
    join usuario u on u.id = n.alumno 
    join materias m on m.id = n.materia 
    `;

  for (let i = 0; i < keys.length; i++) {
    values.push(body[keys[i]]);
    conditions.push(`n.${keys[i]} = $${i + 1}`);
  }
  query += "where " + conditions.join(" and ");

  const result = await db.query(query, values);

  return result.rows;
};

module.exports = getNote;
