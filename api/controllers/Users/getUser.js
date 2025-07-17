const db = require("../../db.js");

const getUser = async ({ id }) => {
  const query = `
        select 	
            u.id,
            u.nombre,
            u.apellido,
            u.condicion,
            u.username,
            c.id as id_carrera,
            c.nombre as carrera,
            c.id as carreraid,
            u.password,
            u.foto,
            u.bio
        from usuario u
        left join carreras c 
        on u.carrera = c.id
        where u.id = $1
    `;

  const resultado = await db.query(query, [id]);

  return resultado.rows[0];
};

module.exports = getUser;
