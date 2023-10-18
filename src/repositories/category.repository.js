const pool = require('../configs/connection');

const getAllCategoriesRepository = async () => {
  const queryGetAllCategories = 'select * from categorias';

  const queryResult = await pool.query(queryGetAllCategories);

  return queryResult;
};

const getCategoryByIdRepository = async (id) => {
  const queryGetCategoryByIdRespository =
    'SELECT * FROM categorias WHERE id = $1';

  const result = await pool.query(queryGetCategoryByIdRespository, [id]);

  return result;
};

module.exports = {
  getAllCategoriesRepository,
  getCategoryByIdRepository,
};
