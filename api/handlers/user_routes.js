const { Router } = require("express");
const router = Router()
const createUser  = require('../controllers/Users/createUser.js')
const getUser = require("../controllers/Users/getUser.js")
const {validateCreateUser} = require("../validations/userValidations.js")

router.post("/", validateCreateUser,async (req, res) => { 
    const createdRes = await createUser(req.body)
    if (!createdRes.status) {
        res.status(200).json(createdRes)
    } else {
        res.status(400).json(createdRes.error)
    }

})

router.get("/:id", async (req, res) => {
    const user = await getUser(req)
    if (user.rowCount === 0) {
        res.status(404).json({"error":"el usuario no existe"})
    } else {
        res.status(200).json(user.rows[0])
    }
})

module.exports = router