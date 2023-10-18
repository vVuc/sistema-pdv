const CustomError = require('./CustomError');
const { verifyVariableIsEmpty } = require('./verifyVariableIsEmpty');
/**
 *
 * @param {array} keysFetched Receberá um array com as chaves buscadas do objeto em questão ex: ['nome','senha']
 * @param {object} objectOfTheRequest Receberá o objeto da requisição {nome, senha}
 */
const validateFields = (keysFetched = [], objectOfTheRequest = {}) => {
  const keysObjectOfTheRequest = Object.keys(objectOfTheRequest);

  keysFetched.map((key) => {
    if (!keysObjectOfTheRequest.includes(key))
      throw new CustomError(`Campo ${key} não informado, favor informar.`, 400);

    if (verifyVariableIsEmpty(objectOfTheRequest[key]))
      throw new CustomError(`Campo ${key} deve estar preenchido.`, 400);
  });
};

module.exports = validateFields;
