const bcrypt = require('bcrypt');
/**
 *
 * @param {string} password: recebe a senha vinda do usuário
 * @returns {string} retornará a hash da senha passada
 */
const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = encryptPassword;
