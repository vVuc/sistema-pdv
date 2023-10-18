const {
  verifyUniqueDataClientRepository,
  clientUpdateRepository,
} = require('../repositories/client.repositories.js');
const CustomError = require('../utils/CustomError.js');
const { InsertIntoData, selectAllById, selectAll } = require('../utils/comon_queries.js');
const validateFieldIsIntPositive = require('../utils/validateFieldIsIntPositive.js');
const validateFieldsIsNumeric = require('../utils/validateFieldsIsNumeric.js');
const validateFields = require('../utils/validateFields.js');
const { default: isEmail } = require('validator/lib/isEmail.js');

const insertNewClientService = async (data) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = data;

  validateFields(['nome', 'cpf', 'email'], data);
  if (!isEmail(email.toLowerCase()))
    throw new CustomError('E-mail em formato inválido.', 400);

  if (isNaN(Number(cpf)))
    throw new CustomError('CPF deve ser uma sequência de números', 400);

  if (isNaN(Number(cep)))
    throw new CustomError('CEP deve ser uma sequência de números', 400);

  const userExist = await verifyUniqueDataClientRepository(email, cpf);

  if (userExist.rows.some((i) => i.email == email))
    throw new CustomError('Favor, usar outro endereço de e-mail', 409);

  if (userExist.rows.some((i) => i.cpf == cpf))
    throw new CustomError('Favor, usar outro cpf', 409);

  return (await InsertIntoData('clientes', { nome, email, cpf, cep, rua, numero, bairro, cidade, estado })).rows;
};

const clientUpdateService = async (data) => {
  const UserUpdate = await clientUpdateRepository(data);

  if (!UserUpdate.rowCount)
    throw new CustomError('Cliente não encontrado', 404);

  return UserUpdate.rows[0];
};

const getClientInfoService = async (id) => {
  validateFieldsIsNumeric(['id'], { id });
  validateFieldsIsNumeric(['id'], { id });
  validateFieldIsIntPositive(['id'], { id });

  const result = await selectAllById('clientes', id);

  if (!result.rowCount) throw new CustomError('Cliente não encontrado', 404);

  return result.rows[0];
};

const clientSelectService = async () => {
  const UserUpdate = await selectAll('clientes');
  return UserUpdate.rows;
};

module.exports = {
  insertNewClientService,
  clientUpdateService,
  clientSelectService,
  getClientInfoService,
};
