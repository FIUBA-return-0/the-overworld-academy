const db = require("../../db.js");

const getInscriptions = async (data) => {
  const tabla = Object.keys(data)[0];

  const values = data[tabla];
  const query = `
    select i.id, u.nombre,u.apellido,m.nombre as materia, i.condicion
    from inscripciones i
    join usuario u on u.id = i.alumno
    join materias m on m.id = i.materia
    where ${tabla[0]}.id = $1
        `;
  const result = await db.query(query, [values]);

  return result.rows;
};

module.exports = getInscriptions;
