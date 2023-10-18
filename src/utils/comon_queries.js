const pool = require('../configs/connection');

const selectAll = async (table) => {
  const queryGetAllCategories = `
  SELECT * 
  FROM ${table}`;
  const queryResult = await pool.query(queryGetAllCategories);
  return queryResult;
};

const selectAllById = async (table, id) => {
  const queryGetCategoryByIdRespository =
    `SELECT * 
    FROM ${table} 
    WHERE id = $1`;
  const result = await pool.query(queryGetCategoryByIdRespository, [id]);
  return result;
};

const InsertIntoData = async (table, data) => {
  const dataArr = [...Object.values(data)];
  const arr = Object.keys(dataArr).map((item) => {
    return '$' + (Object.keys(dataArr).indexOf(item) + 1);
  });
  
  const queryCreateProductRepository =
  `INSERT INTO ${table}(${Object.keys(data).join(',')}) values (${arr.join(',')}) returning *`;
  
  const result = await pool.query(queryCreateProductRepository, dataArr);
  
  return result;
};

const deleteData = async (table, id) => {
  const query = `DELETE FROM ${table} WHERE id = $1 returning *`;
  return await pool.query(query, [id]);
};

module.exports = {
  selectAll,
  selectAllById,
  InsertIntoData,
  deleteData,
};
