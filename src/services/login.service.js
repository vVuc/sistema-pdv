const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');
const { getEmailRepository } = require('../repositories/user.repository');
const isEmail = require('../utils/isEmail');
const validateFields = require('../utils/validateFields');

const logInService = async (dados) => {
  const { email, senha } = dados;

  validateFields(['email', 'senha'], dados);

  if (!isEmail(email.toLowerCase()))
    throw new CustomError('E-mail em formato inválido, favor verificar.', 400);

  const result = await getEmailRepository(email);

  if (!result.rowCount) throw new CustomError('Usuário não cadastrado!', 404);

  const { rows } = result;

  const compareEncryption = await bcrypt.compare(senha, rows[0].senha);

  if (!compareEncryption) {
    throw new CustomError('Usuario e/ou senha invalido.', 400);
  }

  const id = rows[0].id;

  const token = jwt.sign({ id }, process.env.KEY_JWT, {
    expiresIn: '12h',
  });

  return { token };
};

module.exports = { logInService };
