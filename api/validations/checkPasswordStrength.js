const checkPasswordStrength = (password) => {
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?^&#.$($)$-$_])[A-Za-z\d$@$!%*?^&#.$($)$-$_]{8,500}$/;

  if (passwordRegEx.test(password)) {
    return 0;
  } else {
    return 1;
  }
};
module.exports = checkPasswordStrength;
