const db = require("../../db.js");

const deleteUser = async ({ id }) => {
  const query = `DELETE FROM usuario WHERE id = $1`;
  const result = await db.query(query, [id]);

  if (result.rowCount === 0) {
    return undefined;
  }
  return id;
};

module.exports = deleteUser;
