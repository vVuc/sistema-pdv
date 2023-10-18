const CustomError = require('./CustomError');
const message = require('./message');
/**
 *Função que verifica os erros, caso o erro seja do tipo CustomError() ela retorna erro e o status code.
 * 
 * @param {error} error  1º parametro - erro do catch
 * @param {response} response 2º parametro - response do controller
 * @returns {response} retornará uma resposta HTTP com status code e mensagem definidos em CustomError();
 * @Exemple ex: para que a função funcione corretamente, favor, passar o response do controller como segundo parametro eis um Exemplo: 
 * 
*try{

* 
 código que gera erro aqui
*
} catch(error) {
* 
  HandleError(error, response)
*
}
 */
const HandleError = (error, response) => {
  if (error instanceof CustomError) {
    return response.status(error.status).json(message(error.message));
  }

  return response.status(500).json(message(error.message));
};

module.exports = HandleError;
