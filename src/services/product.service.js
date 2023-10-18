const {
  getFilteredProducts,
  updateProductRepository,
  getDeletedProduct,
} = require('../repositories/product.repository');
const uploadImage = require('../utils/uploadImage');

const CustomError = require('../utils/CustomError');
const validateFields = require('../utils/validateFields');
const validateFieldsIsNumeric = require('../utils/validateFieldsIsNumeric');
const deleteImage = require('../utils/deleteImage');
const { listOrdersByProduct_idRepository } = require('../repositories/order.repository');
const { selectAll, deleteData, InsertIntoData, selectAllById } = require('../utils/comon_queries');

const getProductsService = async (categoryId) => {
  let result;

  if (categoryId) {
    result = await getFilteredProducts(categoryId);
    if (isNaN(Number(categoryId)))
      throw new CustomError('O id da categoria deve ser um número', 400);
  } else {
    result = await selectAll('produtos');
  }

  return result.rows;
};

const ProductDeleteService = async (id) => {
  if (isNaN(Number(id) && Number(id) < 0))
    throw new CustomError('O id deve ser um número e maior que 0', 400);

  const getOrder = await listOrdersByProduct_idRepository(id);
  if (getOrder.rowCount)
    throw new CustomError('O produto está vinculado a um pedido', 409);

  const getDeletedImage = await getDeletedProduct(id);
  if (!getDeletedImage) throw new CustomError('Produto não encontrado', 404);

  if (getDeletedImage.produto_imagem === null) {
    await deleteData('produtos', id);
    return;
  }
  await deleteImage(getDeletedImage);
  await deleteData('produtos', id);
};

const getProductByIdService = async (id) => {
  if (isNaN(Number(id))) throw new CustomError('O id deve ser um número', 400);

  const result = await selectAllById('produtos', id);

  if (!result.rowCount) throw new CustomError('Produto não encontrado', 404);

  return result.rows;
};

const createProductService = async (data) => {
  const { body, file } = data;
  const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = body;
  const imageLocation = file ? await uploadImage(file) : null;

  body.produto_imagem = imageLocation;
  const result = await InsertIntoData('produtos', { descricao, quantidade_estoque, valor, categoria_id, produto_imagem });

  if (!result.rowCount)
    throw new CustomError('Não foi possível criar o produto.', 503);

  const { rows } = result;

  delete rows[0].id;

  return {
    ...rows[0],
    produto_imagem: imageLocation,
  };
};

const updateProductService = async (data) => {
  validateFields(['id'], data.params);

  validateFieldsIsNumeric(['id'], data.params);

  const productExists = await selectAllById('produtos', data.params.id);

  const { rowCount } = productExists;

  if (!rowCount)
    throw new CustomError(
      'Por favor, passe o id de um produto existente.',
      400
    );

  const { body } = data;

  await updateProductRepository(body, data.params.id);

  return;
};

module.exports = {
  getProductsService,
  createProductService,
  updateProductService,
  getProductByIdService,
  ProductDeleteService,
};
