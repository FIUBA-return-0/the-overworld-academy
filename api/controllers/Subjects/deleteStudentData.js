const db = require("../../db.js");

const deleteStudentData = async (req) => {
    const { profesor } = req.body;
  
    const queryNotas = `DELETE FROM notas WHERE alumno = $1`;
    const queryInscripciones = `DELETE FROM inscripciones WHERE alumno = $1`;
  
    const resultNotas = await db.query(queryNotas, [profesor]);
    const resultInsc = await db.query(queryInscripciones, [profesor]);
  
    if (resultNotas.rowCount === 0 && resultInsc.rowCount === 0) {
      return undefined;
    }
  
    return profesor;
  };
  
module.exports = deleteStudentData