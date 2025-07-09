const db = require("../../db.js");
/**
 * busca en la base de datos la carrera con el id enviado
 * @param {object} req
 * @returns devuelve un objeto con la carrera. si el objeto esta vacio, no se encontro la carrera
 */
const getDegree = async ({ id }) => {
  const query = `
    select c.id,c.nombre as carrera,c.description,c.duracion,c.sede, u.nombre,u.apellido,u.username from carreras c
    join usuario u
    on c.director = u.id
    where c.id = $1
    `;

  const resultado = await db.query(query, [id]);

  return resultado.rows[0];
};

module.exports = getDegree;
