const CustomError = require('../utils/CustomError');
const HandleError = require('../utils/HandleError');

const HandleErrorMid = (err, _req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json(err.message);
  }

  res.status(500).json({ mensagem: 'erro interno do servidor' });
  next();
};
// eslint-disable-next-line no-unused-vars
const allErrors = (err, _req, res, _next) => {
  return HandleError(err, res);
};

module.exports = { HandleErrorMid, allErrors };
