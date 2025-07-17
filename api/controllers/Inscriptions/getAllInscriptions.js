const db = require("../../db.js");

const getInscriptions = async (data) => {
  // const tabla = Object.keys(data)[0];

  // const values = data[tabla];
  const keys = Object.keys(data);
  const conditions = [];
  const values = [];

  let query = `
    select i.id, u.id as idAlumno ,m.id as idCarrera,u.nombre,u.apellido,m.nombre as materia, i.condicion
    from inscripciones i
    join usuario u on u.id = i.alumno
    join materias m on m.id = i.materia
        `;
  for (let i = 0; i < keys.length; i++) {
    values.push(data[keys[i]]);
    conditions.push(`i.${keys[i]} = $${i + 1}`);
  }

  query += "where " + conditions.join(" and ");

  const result = await db.query(query, values);

  return result.rows;
};

module.exports = getInscriptions;
