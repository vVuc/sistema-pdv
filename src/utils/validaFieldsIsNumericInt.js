const CustomError = require('./CustomError');

/**
 *Valida se os tipos passados são numéricos e se são do tipo inteiro
 * @param {array} keysFetched Receberá um array com as chaves buscadas do objeto em questão ex: ['nome','senha']
 * @param {object} objectOfTheRequest Receberá o objeto da requisição {nome, senha}
 */
const validateFieldsIsNumericInt = (
  keysFetched = [],
  objectOfTheRequest = {}
) => {
  keysFetched.map((key) => {
    if (!Number.isInteger(objectOfTheRequest[key]))
      throw new CustomError(
        `O campo de nome: ${key}, deve ser do tipo númerico inteiro.`,
        400
      );
  });
};

module.exports = validateFieldsIsNumericInt;
