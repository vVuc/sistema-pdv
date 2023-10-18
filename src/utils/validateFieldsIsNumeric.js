const CustomError = require('./CustomError');

/**
 *Validará se os campos passados são do tipo numérico, não validando se são inteiros ou não.
 * @param {array} keysFetched Receberá um array com as chaves buscadas do objeto em questão ex: ['nome','senha']
 * @param {object} objectOfTheRequest Receberá o objeto da requisição {nome, senha}
 */
const validateFieldsIsNumeric = (keysFetched = [], objectOfTheRequest = {}) => {
  keysFetched.map((key) => {
    if (isNaN(objectOfTheRequest[key]))
      throw new CustomError(
        `O campo de nome: ${key}, deve ser do tipo númerico.`,
        400
      );
  });
};

module.exports = validateFieldsIsNumeric;
