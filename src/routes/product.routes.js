const { Router } = require('express');
const {
  getProductsController,
  createProductController,
  updateProductController,
  getProductByIdController,
  deleteProductController,
} = require('../controllers/products.controller.js');
const {
  checkFieldsForUpdateAndCreateProductMiddleware,
} = require('../middlewares/checkFieldsForUpdateAndCreateProductMiddleware.js');
const routes = Router();
const multer = require('multer');
const upload = multer({});

routes.get('/', getProductsController);
routes.get('/:id', getProductByIdController);
routes.post(
  '/',
  upload.single('produto_imagem'),
  checkFieldsForUpdateAndCreateProductMiddleware,
  createProductController
);
routes.put(
  '/:id',
  checkFieldsForUpdateAndCreateProductMiddleware,
  updateProductController
);
routes.delete('/:id', deleteProductController);

module.exports = routes;
