const validator = require('validator');
/**
 * 
 * @param {string} email: Deve receber o email do usuário, caso o e-email seja válido retorna: true, ou seja; um e-mail nos padrões aceitáveis.
 * @returns {boolean}
 */
module.exports = (email) => {
  return validator.isEmail(email);
};
