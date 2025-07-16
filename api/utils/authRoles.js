const authAlumno = (req, res, next) => {
  if (req.user.condicion !== "alumno") {
    res.send(401).json({ error: "Tenes que ser alumno" });
  } else {
    next();
  }
};
const authDirector = (req, res, next) => {
  if (req.user.condicion != "director") {
    res.status(401).json({ error: "debes ser director." });
  } else {
    next();
  }
};
const authDirectorProfesor = (req, res, next) => {
  if (req.user.condicion === "alumno") {
    res
      .status(401)
      .json({ error: "un alumno no puede realizar esta peticion" });
  } else {
    next();
  }
};
const authProfesor = (req, res, next) => {
  if (req.user.condicion !== "profesor") {
    res.status(401).json({ error: "debes ser profesor" });
  } else {
    next();
  }
};
const authSameUser = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    res
      .status(401)
      .json({ error: "solo podes modificar tu propia informacion" });
  } else {
    next();
  }
};

module.exports = {
  authAlumno,
  authDirector,
  authDirectorProfesor,
  authProfesor,
  authSameUser,
};
