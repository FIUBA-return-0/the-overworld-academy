const db = require("../../db.js");

const updateDegree = async (body, id) => {
  const { nombre, description, duracion, sede } = body;

  const values = [nombre, description, duracion, sede, id];
  const query = `
        UPDATE carreras
        SET nombre = $1,
        description = $2,
        duracion = $3,
        sede = $4   
        WHERE id = $5
        RETURNING *
    `;
  const res = await db.query(query, values);
  return res.rows[0];
};

module.exports = updateDegree;
