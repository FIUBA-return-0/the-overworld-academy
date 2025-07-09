const db = require("../../db.js");

/**
 *
 * @param {object} {id:int}
 * @returns devuelve un objeto que representa al usuario, un objeto vacio o undefined indica que no se encontro el usuario
 */
const getUser = async ({ id }) => {
  const query = `
        select 	
            u.id,
            u.nombre,
            u.apellido,
            u.condicion,
            u.username,
            c.nombre as carrera,
            u.password,
            u.foto,
            u.bio
        from usuario u
        join carreras c 
        on u.carrera = c.id
        where u.id = $1
    `;

  const resultado = await db.query(query, [id]);

  return resultado.rows[0];
};

module.exports = getUser;
