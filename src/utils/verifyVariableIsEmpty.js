const verifyVariableIsEmpty = (variable) => {
  if (typeof variable == 'undefined') return true;

  if (typeof variable != 'string') return false;

  variable = variable.trim();

  if (!variable.length) return true;

  return false;
};

module.exports = {
  verifyVariableIsEmpty,
};
