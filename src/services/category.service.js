const { selectAll, selectAllById } = require('../utils/comon_queries');

const getAllCategoriesService = async () => {
  const result = await selectAll('categorias');
  return result.rows;
};

const getCategoryByIdService = async (id) => {
  const result = await selectAllById('categorias', id);
  return result;
};

module.exports = {
  getAllCategoriesService,
  getCategoryByIdService,
};
