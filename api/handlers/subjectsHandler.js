const { Router } = require("express");
const router = Router()
const createSubject  = require('../controllers/Subjects/createSubject.js')
const getSubject = require("../controllers/Subjects/getSubject.js")
const validateCreateSubject = require("../validations/subjectValidations.js")
const validateTeacherId = require("../validations/subjectValidations.js")
const ValidateDegreeId = require("../validations/subjectValidations.js")
const getAllSubjects = require("../controllers/Subjects/getAllSubjects")
const deleteSubject = require("../controllers/Subjects/deleteSubject.js")

router.post("/", validateCreateSubject, validateTeacherId, ValidateDegreeId, async (req, res) => { 
    const result = await createSubject(req.body)
    let status = !result.status ? 201 : 500
    res.status(status).json(result.content)
})

router.get('/', async (req, res) => {
    
    const result = await getAllSubjects();
    
    if (!result.length) {
        res.status(404).json({"error":"no hay materias disponibles"})
    } else {
        res.status(200).json(result)
    }
})

router.get("/:id", async (req, res) => {
    const user = await getSubject(req)
    
    if (!user) {
        res.status(404).json({"error":"la materia no existe"})
    } else {
        res.status(200).json(user)
    }
})

router.delete('/:id', async (req, res) => {
    const result = await deleteSubject(req)

    if (!result){
        res.status(404).json({"error":"No se puede eliminar una materia que no existe"})
    } else {
        res.status(200).json(result)
    }
})

module.exports = router