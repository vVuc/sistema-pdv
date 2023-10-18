
const {
  getProductsService,
  createProductService,
  updateProductService,
  getProductByIdService,
  ProductDeleteService,
} = require('../services/product.service');

const getProductsController = async (req, res) => {
  const categoryId = req.query.categoria_id;

  const products = await getProductsService(categoryId);

  return res.json(products);
};

const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const products = await getProductByIdService(id);

  return res.json(products);
};

const deleteProductController = async (req, res) => {
  await ProductDeleteService(req.params.id);
  res.status(204).json();
};

const createProductController = async (req, res) => {
  const result = await createProductService(req);

  return res.status(201).json(result);
};

const updateProductController = async (req, res) => {
  const result = await updateProductService(req);

  return res.status(204).json(result);
};

module.exports = {
  getProductsController,
  createProductController,
  updateProductController,
  getProductByIdController,
  deleteProductController,
};
