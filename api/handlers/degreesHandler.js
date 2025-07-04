const { Router } = require("express");
const router = Router()
const createDegree = require('../controllers/Degrees/createDegree.js')
const getAllDegrees = require('../controllers/Degrees/getAllDegrees.js')
const validateDegreeValues = require('../validations/degreeValidations.js');
const validateId = require("../validations/idValidation.js");
const getDegree = require("../controllers/Degrees/getDegree.js");
const deleteDegree = require("../controllers/Degrees/deleteDegree.js");
const updateDegree = require("../controllers/Degrees/updateDegree.js");


router.post('/', validateDegreeValues, async (req, res) => {
    const result = await createDegree(req.body)
    
    let status = !result.status? 201 : 500
    res.status(status).json(result.content)
})

router.get('/', async (req, res) => {
    
    const result = await getAllDegrees();
    
    if (!result.length) {
        res.status(404).json({"error":"no hay carreras disponibles"})
    } else {
        res.status(200).json(result)
    }
})

router.get('/:id', validateId, async (req, res) => {
    const degree = await getDegree(req)
    
    if (!degree) {
        res.status(404).json({"error":"La carrera no existe"})
    } else {
        res.status(200).json(degree)
    }
})

router.delete('/:id', async (req, res) => {
    const result = await deleteDegree(req)

    if (!result){
        res.status(404).json({"error":"No se puede eliminar una carrera que no existe"})
    } else {
        res.status(200).json(result)
    }
})

router.put('/:id', validateDegreeValues, async (req, res) => {
    const { id } = req.params
    const result = await updateDegree(req.body, id)
    
    if (!result) {
        res.status(404).json({"error":"La carrera no existe"})
    } else {
        res.status(200).json(result)
    }

})

module.exports = router

