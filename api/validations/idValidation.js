
/**
 * valida que se haya ingresado id y que sea positivo
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns undefined. Error 400 de incumplir
 */
const validateId = async (req, res, next) => {

    const { carrera } = await req.body;

    if(!carrera || carrera <= 0 || isNaN(carrera)){
        return res.status(400).json({error: 'El id enviado debe ser mayor que 0'})
    }
    next()
}

module.exports = validateId