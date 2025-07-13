const db = require("../../db.js");

/**
 * Crea en la base de datos la carrera con los datos brindados
 * @param {object} body debe tener profesor, nombre, carga horaria y carrera a la que corresponde
 * @returns un objeto con la primer key "status" si esta es 1, el campo content es la informacion de la carrera, de lo contrario es el mensaje de error
 */

const createSubject = async (body) => {
  const { profesor, nombre, carga_horaria, carrera, foto } = body;
  const values = [profesor, nombre, carga_horaria, carrera, foto];

  const query = `
        INSERT INTO materias (profesor,nombre,carga_horaria,carrera,foto)
        VALUES($1,$2,$3,$4,$5)
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
