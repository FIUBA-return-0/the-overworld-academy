const db = require("../../db.js");

const getInscription = async ({ id }) => {
  const query = `
    select i.id,m.id as idCarrera, u.nombre,u.apellido,m.nombre as materia, i.condicion
    from inscripciones i
    join usuario u on u.id = i.alumno
    join materias m on m.id = i.materia
    where i.id =$1;
    `;
  const result = await db.query(query, [id]);

  return result.rows;
};

module.exports = getInscription;
