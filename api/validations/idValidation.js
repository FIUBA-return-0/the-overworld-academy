const validateId = async (req, res, next) => {

    const { id } = await req.params;

    if(!id || id <= 0){
        return res.status(400).json({error: 'El id enviado debe ser mayor que 0'})
    }
    next()
}

module.exports = validateId