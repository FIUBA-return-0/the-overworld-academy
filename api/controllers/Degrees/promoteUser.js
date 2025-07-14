const db = require("../../db.js");

const promoteUser = async ({ profesor }) => {
  const query = `
        update usuario u
        set condicion = 'profesor'
        where u.id = $1
        and u.condicion = 'alumno'
        returning *
    `;
  try {
    const result = await db.query(query, [profesor]);
    return { status: 0, content: result.rows };
  } catch (error) {
    return { status: 1, content: error.detail };
  }
};

module.exports = promoteUser;
