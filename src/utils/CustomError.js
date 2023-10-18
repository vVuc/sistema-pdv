/**
 * Esta classe serve para gerarmos erros personalizados no sistema, com a possibilidade de enviarmos o status-code.
 * 
 * @param {mensagem}: Deve receber a mensagem de erro que será mostrada.
 * @param {status}: Deve receber o status-code condizente com o erro HTTP apropriado. 
 */
class CustomError extends Error {
  constructor(mensagem, status) {
    super(mensagem);
    this.status = status;
    this.name = this.constructor.name;
  }
}
module.exports = CustomError;
