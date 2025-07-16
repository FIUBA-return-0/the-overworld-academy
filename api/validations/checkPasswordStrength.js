const checkPasswordStrength = async (req, res, next) => {
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?^&#.$($)$-$_])[A-Za-z\d$@$!%*?^&#.$($)$-$_]{8,500}$/;

  if (passwordRegEx.test(req.body.password)) {
    next();
  } else {
    return res.status(400).json({ error: "contraseña insegura" });
  }
};
module.exports = checkPasswordStrength;
