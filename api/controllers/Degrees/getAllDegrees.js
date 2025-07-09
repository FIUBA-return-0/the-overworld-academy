const db = require("../../db.js");
/**
 * Devuelve todas las carreras disponibles en la base de datos
 * @returns array de objetos donde cada uno es una carrera, si esta vacio, no hay carreras
 */
const getAllDegrees = async () => {
  const query = `
    select c.id,c.nombre as carrera,c.description,c.duracion,c.sede, u.nombre,u.apellido,u.username from carreras c
    join usuario u
    on c.director = u.id
    `;
  const res = await db.query(query);
  return res.rows;
};

module.exports = getAllDegrees;
