const { Router } = require("express");
const router = Router();
const userRouter = require("../handlers/userHandler.js");
const degreeRouter = require("../handlers/degreesHandler.js");
const subjectRouter = require("../handlers/subjectsHandler.js");
const inscriptionRouter = require("../handlers/inscriptionHandler.js");
const notesRouter = require("../handlers/notesHandler.js");


router.use("/usuario", userRouter);
router.use("/carrera", degreeRouter);
router.use("/materia", subjectRouter);
router.use("/inscripcion", inscriptionRouter);
router.use("/nota",notesRouter);


module.exports = router;
