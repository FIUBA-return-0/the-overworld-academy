const validateCreateUser = (req,res,next) => {

    const { nombre, apellido, condicion, password } = req.body

    if (!nombre || !apellido || !condicion || !password) {
        return res.status(400).json({"error":"Algun contenido esta vacio, por favor revisa tus entradas"})
    }

    if (nombre.length > 50 || apellido.length >20) {
        return res.status(400).json({ "error": "Nombre o apellido mas largo de lo permitido." })
    }
    if (condicion != "alumno" && condicion != "profesor" && condicion != "director") {
        return res.status(400).json({"error":"un usuario solo puede ser alumno, profesor o director"})
    }
    next()
}

const validateSentCondition = (req, res, next) => {
    const {condition} = req.query
    if (condition != 'alumno' && condition != 'profesor' && condition != 'director') {
        return res.status(400).json({"error":"la condicion debe ser valida"})
    }
    next()
}
module.exports = {validateCreateUser,validateSentCondition}