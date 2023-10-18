const pool = require('../configs/connection');

const getFilteredProducts = async (categoryId) => {
  const queryGetProductsByCategoryId =
    'select * from produtos where categoria_id = $1';
  const productsResults = await pool.query(queryGetProductsByCategoryId, [
    categoryId,
  ]);

  return productsResults;
};

const getDeletedProduct = async (id) => {
  const query = 'select produto_imagem FROM produtos WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const updateProductRepository = async (dataProductUpdate, idProduct) => {
  const { descricao, quantidade_estoque, valor, categoria_id } =
    dataProductUpdate;

  const queryUpdateProductRepository =
    'UPDATE produtos SET descricao = $1, quantidade_estoque = $2, valor = $3, categoria_id = $4 WHERE id = $5';

  const result = await pool.query(queryUpdateProductRepository, [
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
    idProduct,
  ]);

  return result;
};

module.exports = {
  getFilteredProducts,
  updateProductRepository,
  getDeletedProduct,
};
