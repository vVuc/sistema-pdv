const CustomError = require('./CustomError');

module.exports = (password) => {
  password = password.toString();
  //adiconar o throw new Custom Error
  if (password.length < 8) {
    throw new CustomError(
      'Por favor, crie uma senha de ao menos 8 caracteres, contendo letras minúsculas, letras maiúsculas, caracteres especiais e números.',
      400
    );
  }

  const regexCharEspecials = new RegExp(
    /\|\*|\.|\+|\?|\||\[|\]|\(|\)|\{|\}|\/|<|>|!|=|:|,|;|-| |%|@|#|_|~|`´\^/g
  );

  if (!regexCharEspecials.test(password)) {
    throw new CustomError(
      'Por favor, adicionar ao menos um caracter especial.',
      400
    );
  }

  const regexCharLowerCase = new RegExp(/[a-z]/);
  if (!regexCharLowerCase.test(password)) {
    throw new CustomError(
      'Por favor, adicione pelo ao menos uma letra minúscula.',
      400
    );
  }

  const regexCharUpperCase = new RegExp(/[A-Z]/);
  if (!regexCharUpperCase.test(password)) {
    throw new CustomError(
      'Por favor, adicione pelo ao menos uma letra maiúscula.',
      400
    );
  }
  const regexCharNumeric = new RegExp(/\d/g);
  if (!regexCharNumeric.test(password)) {
    throw new CustomError('Por favor, adicione pelo ao menos um número.', 400);
  }
};
