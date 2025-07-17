const db = require("../../db.js");
/**
 * busca en la base de datos la materia con el id enviado
 * @param {object} req
 * @returns devuelve un objeto con la materia. si el objeto esta vacio, no se encontro la materia
 */
const getSubject = async (data) => {
  const campo = Object.keys(data);
  const values = data[campo];
  const query = `
    select m.id,m.nombre as materia,m.foto , u.id as padron, u.nombre as nombProfesor, u.apellido apeProfesor, m.carga_horaria, m.descripcion, m.cartelera, c.nombre as carrera from materias m
    join carreras c
    on c.id = m.carrera
    join usuario u
    on u.id =  m.profesor
    where m.${campo} = $1 
    `;

  const resultado = await db.query(query, [values]);

  return resultado.rows;
};

module.exports = getSubject;
