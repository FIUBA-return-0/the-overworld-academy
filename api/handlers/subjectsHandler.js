const { Router } = require("express");
const router = Router()
const createSubject  = require('../controllers/Subjects/createSubject.js')
const getSubject = require("../controllers/Subjects/getSubject.js")
const validateCreateSubject = require("../validations/subjectValidations.js")

router.post("/", validateCreateSubject, async (req, res) => { 
    const result = await createSubject(req.body)
    let status = !result.status ? 201 : 500
    res.status(status).json(result.content)
})

router.get("/:id", async (req, res) => {
    const user = await getSubject(req)
    
    if (!user) {
        res.status(404).json({"error":"la materia no existe"})
    } else {
        res.status(200).json(user)
    }
})

module.exports = router