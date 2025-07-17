const db = require("../../db.js");

const getDegree = async ({ id }) => {
  const query = `
    select c.id,c.nombre as carrera,c.description,c.duracion,c.sede,c.foto, u.nombre,u.apellido,u.username from carreras c
    left join usuario u
    on c.director = u.id
    where c.id = $1
    `;

  const resultado = await db.query(query, [id]);

  return resultado.rows[0];
};

module.exports = getDegree;
