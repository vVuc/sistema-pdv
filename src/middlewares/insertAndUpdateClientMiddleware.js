const { default: isEmail } = require('validator/lib/isEmail');
const CustomError = require('../utils/CustomError');
const validateFields = require('../utils/validateFields');
const {
  verifyUniqueDataClientRepository,
} = require('../repositories/client.repositories');

const insertAndUpdateMiddleware = async (req, res, next) => {
  const { email, cpf, cep } = req.body;

  validateFields(['nome', 'cpf', 'email'], req.body);

  if (!isEmail(email.toLowerCase()))
    throw new CustomError('E-mail em formato inválido.', 400);

  if (isNaN(Number(cpf)))
    throw new CustomError('CPF deve ser uma sequência de números', 400);

  if (isNaN(Number(cep)))
    throw new CustomError('CEP deve ser uma sequência de números', 400);

  const userExist = await verifyUniqueDataClientRepository(email, cpf);

  if (userExist.rows.find((i) => i.email == email))
    throw new CustomError('Favor, usar outro endereço de e-mail', 409);

  if (userExist.rows.find((i) => i.cpf == cpf))
    throw new CustomError('Favor, usar outro cpf', 409);

  next();
};
module.exports = {
  insertAndUpdateMiddleware,
};
