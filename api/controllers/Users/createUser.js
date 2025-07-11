const db = require("../../db.js");
/**
 *  realiza la query a la base de datos para insertar un usuario con los datos brindados
 * @param {object} data debe contener nombre, apellido, rol,username,password,carrera
 * @returns devuelve un objeto con una key status, si es 1 el campo content tiene el mensaje de error y si es 0 tiene el id del usuario creado
 */
const createUser = async ({
  nombre,
  apellido,
  username,
  password,
  carrera,
}) => {
  const values = [nombre, apellido, username, password, carrera];

  const query = `
        INSERT INTO usuario (nombre,apellido,condicion,username,password,carrera)
        VALUES($1,$2,'alumno',$3,$4,$5)
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
