const db = require("../../db.js");

const promoteUser = async ({ id }) => {
  const query = `
        update usuario u
        set condicion = 'profesor'
        where u.id = $1
        returning *
    `;
  try {
    const result = await db.query(query, [id]);
    return { status: 0, content: result.rows };
  } catch (error) {
    return { status: 1, content: error.detail };
  }
};

module.exports = promoteUser;
