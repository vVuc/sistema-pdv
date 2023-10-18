const {
  userUpdateRepository,
  getDataUseByIDRepository,
  getEmailRepository,
} = require('../repositories/user.repository');
const CustomError = require('../utils/CustomError');
const checkPasswordIsSecurety = require('../utils/checkPasswordIsSecurety');
const isEmail = require('../utils/isEmail');
const encryptPassword = require('../utils/newHash');
const validateFields = require('../utils/validateFields');

const userUpdateService = async (dataUser) => {
  let { nome, email, senha } = dataUser;

  //A função abaixo: validateFilds, verifica se o objeto da requisição possuí campos vázios (preenchidos somente com espaços) e se as variáveis foram definidas. Para tal, precisamos passar as chaves que queremos buscar em um array de string's como primeiro argumento e um objeto da requisição com as chaves possuindo o mesmo nome.
  validateFields(['nome', 'email', 'senha'], { nome, senha, email });

  checkPasswordIsSecurety(senha);

  email = email.toLowerCase();

  //A funcção abaixo verifica se o email passado pelo usuário, veio em formato válido
  if (!isEmail(email))
    throw new CustomError(
      'Formato de email inválido, favor digitar um e-mail válido ex: fulanodetal@servicoDeEmail.com',
      400
    );

  //aqui pegamos o id do usuário que esta sendo passado no momento que foi autênticado.
  const { user } = dataUser;

  //aqui verificamos se o usuário ainda existe na nossa base de dados através do ID do mesmo, caso exista, retorna os dados do usuário.
  const userExistsForId = await getDataUseByIDRepository(user.id);

  const { rowCount, rows } = userExistsForId;

  if (!rowCount)
    throw new CustomError('Usuários não existe em nossa base de ados.', 404);

  if (email == rows[0].email)
    throw new CustomError('Este é o seu email atual', 409);

  if (email != rows[0].email) {
    let result = await getEmailRepository(email);

    if (result.rowCount)
      throw new CustomError(
        'Este e-mail não pode ser utilizado, por favor, tente novamente.',
        409
      );
  }

  dataUser.senha = await encryptPassword(senha);

  await userUpdateRepository(dataUser);

  return;
};

const infoUserService = async (data) => {
  const result = await getDataUseByIDRepository(data.user.id);

  const { rows } = result;

  return rows[0];
};

module.exports = {
  userUpdateService,
  infoUserService,
};
