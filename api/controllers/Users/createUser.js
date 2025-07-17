const db = require("../../db.js");

const createUser = async ({
  nombre,
  apellido,
  username,
  password,
  carrera,
  foto,
  bio,
}) => {
  const values = [nombre, apellido, username, password, carrera, foto, bio];

  const query = `
        INSERT INTO usuario (nombre,apellido,condicion,username,password,carrera,foto,bio)
        VALUES($1,$2,'alumno',$3,$4,$5,$6,$7)
        RETURNING id;
    `;
  try {
    const content = await db.query(query, values);

    return { status: 0, content: content.rows[0] };
  } catch (error) {
    return { status: 1, content: error.detail };
  }
};

module.exports = createUser;
