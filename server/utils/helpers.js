const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 8;

    return (
      hasUppercase &&
      hasLowercase &&
      isLongEnough
    );
}

module.exports = {
  validatePassword,
};