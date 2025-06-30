const { Router } = require("express");
const router = Router()
const createDegree = require('../controllers/Degrees/createDegree.js')
const getAllDegrees = require('../controllers/Degrees/getAllDegrees.js')
const validateCreateDegree = require('../validations/degreeValidations.js');
const validateId = require("../validations/idValidation.js");
const getDegree = require("../controllers/Degrees/getDegree.js");
router.post('/', validateCreateDegree, async (req, res) => {
    const result = await createDegree(req.body)

    if (!result.status) {
        res.status(200).json(result)
    } else {
        res.status(400).json(result.error)
    }
})

router.get('/', async (req,res) => {

    const result = await getAllDegrees();
    if (!result.length) {
        res.status(404).json({"error":"no se encontro la/s carrera/s buscada/s"})
    } else {
        res.status(200).json(result)
    }
})

router.get('/:id', validateId, async (req, res) => {
    const degree = await getDegree(req)
    if (!degree.length) {
        res.status(404).json({"error":"La carrera no existe"})
    } else {
        res.status(200).json(degree)
    }
})

module.exports = router