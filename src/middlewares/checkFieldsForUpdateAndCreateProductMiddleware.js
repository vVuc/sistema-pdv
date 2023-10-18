const CustomError = require('../utils/CustomError');
const validateFieldsIsNumericInt = require('../utils/validaFieldsIsNumericInt');
const validateFields = require('../utils/validateFields');
const validateFieldsIsNumeric = require('../utils/validateFieldsIsNumeric');
const transformInt = require('../utils/transformInt');
const HandleError = require('../utils/HandleError');
const { selectAllById } = require('../utils/comon_queries');

const checkFieldsForUpdateAndCreateProductMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const { body } = req;

    const data = transformInt(body);

    validateFields(
      ['descricao', 'quantidade_estoque', 'valor', 'categoria_id'],
      data
    );

    validateFieldsIsNumeric(
      ['valor', 'quantidade_estoque', 'categoria_id'],
      data
    );

    validateFieldsIsNumericInt(
      ['valor', 'quantidade_estoque', 'categoria_id'],
      data
    );

    const { categoria_id } = data;

    const categoryExists = await selectAllById('categorias', categoria_id);

    const { rowCount } = categoryExists;

    if (!rowCount)
      throw new CustomError(
        'Por favor, passe o id de uma categoria existente.',
        400
      );
    req.body = data;
    next();
  } catch (error) {
    HandleError(error, res);
  }
};

module.exports = {
  checkFieldsForUpdateAndCreateProductMiddleware,
};
