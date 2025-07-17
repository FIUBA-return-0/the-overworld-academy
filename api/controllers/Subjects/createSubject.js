const db = require("../../db.js");

const createSubject = async (body) => {
  const {
    profesor,
    nombre,
    carga_horaria,
    carrera,
    foto,
    descripcion,
    cartelera,
  } = body;
  const values = [
    profesor,
    nombre,
    carga_horaria,
    carrera,
    foto,
    descripcion,
    cartelera,
  ];

  const query = `
        INSERT INTO materias (profesor,nombre,carga_horaria,carrera,foto,descripcion,cartelera)
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING id
    `;
  try {
    const content = await db.query(query, values);

    return { status: 0, content: content.rows[0] };
  } catch (error) {
    return { status: 1, content: error.message };
  }
};

module.exports = createSubject;
