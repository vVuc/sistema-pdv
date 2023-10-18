const CustomError = require('./CustomError');

module.exports = (number) => {
  if (number < 1)
    throw new CustomError('O número deve ser um inteiro positivo.', 400);
};
