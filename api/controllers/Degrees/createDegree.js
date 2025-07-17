const db = require("../../db.js");

const createDegree = async ({
  nombre,
  description,
  duracion,
  sede,
  foto,
  director,
}) => {
  const values = [nombre, description, duracion, sede, foto, director];
  const query = `
        INSERT INTO carreras (nombre,description,duracion,sede,foto,director)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING id
    `;
  try {
    const res = await db.query(query, values);
    return { status: 0, content: res.rows[0] };
  } catch (error) {
    return { status: 1, content: error.detail };
  }
};

module.exports = createDegree;
