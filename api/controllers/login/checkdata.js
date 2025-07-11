const db = require("../../db.js");

const checkData = async (req, res) => {
  const { username } = req.body;
  const query = `
        select * from usuario u
        where u.username = $1
    `;

  const result = await db.query(query, [username]);
  return result.rows[0];
};

module.exports = checkData;
