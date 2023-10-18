const {
  getEmailRepository,
} = require('../repositories/user.repository');
const CustomError = require('../utils/CustomError');
const checkPasswordIsSecurety = require('../utils/checkPasswordIsSecurety');
const { InsertIntoData } = require('../utils/comon_queries');
const isEmail = require('../utils/isEmail');
const validateFields = require('../utils/validateFields');
const bcrypt = require('bcrypt');

const registerService = async (data) => {
  let { nome, email, senha } = data;

  validateFields(['nome', 'email', 'senha'], data);

  checkPasswordIsSecurety(senha);

  if (!isEmail(email.toLowerCase()))
    throw new CustomError('E-mail em formato inválido.', 400);

  const emailExists = await getEmailRepository(email);

  if (emailExists.rowCount)
    throw new CustomError('Favor, usar outro endereço de e-mail', 409);

  const newPassword = await bcrypt.hash(senha, 10);
  senha = newPassword;

  const createNewUser = (await InsertIntoData('usuarios', { nome, email, senha }));

  // eslint-disable-next-line no-unused-vars
  const { senha: _, ...result } = createNewUser.rows[0];

  return result;
};

module.exports = {
  registerService,
};
