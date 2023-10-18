const { getAllCategoriesService } = require('../services/category.service');

const getAllCategoriesController = async (req, res) => {
  const categories = await getAllCategoriesService();

  return res.json(categories);
};

module.exports = getAllCategoriesController;
