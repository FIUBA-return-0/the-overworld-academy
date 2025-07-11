const { Router } = require("express");
const router = Router();
const userRouter = require("../handlers/userHandler.js");
const degreeRouter = require("../handlers/degreesHandler.js");
const subjectRouter = require("../handlers/subjectsHandler.js");
const inscriptionRouter = require("../handlers/inscriptionHandler.js");
const notesRouter = require("../handlers/notesHandler.js");
const loginRouter = require("../handlers/loginHandler.js");

router.use("/usuario", userRouter);
router.use("/carrera", degreeRouter);
router.use("/materia", subjectRouter);
router.use("/inscripcion", inscriptionRouter);
router.use("/nota", notesRouter);
router.use("/login", loginRouter);

module.exports = router;

// log in  -> chqueas que username y contraseñea sean validos( con db ya estaria hasheado) -> creame un token y le devuelve al front
