const express = require('express');
const { logInController, signUp } = require('../controllers/auth.controller');
const { auth } = require('../middlewares/auth.middleware');
const userRoutes = require('./user.routes');
const clientRoutes = require('./client.routes');
const productRoutes = require('./product.routes');
const getAllCategoriesController = require('../controllers/categories.controller');
const orderRoutes = require('./order.routes');

const routes = express.Router();

//Rotas sem Autenticação
routes.get('/categoria', getAllCategoriesController);
routes.post('/login', logInController);
routes.post('/usuario', signUp);
//Apartir daqui todas as rotas precisam de autenticação
routes.use(auth);

routes.use('/produto', productRoutes);
routes.use('/usuario', userRoutes);
routes.use('/cliente', clientRoutes);
routes.use('/pedido', orderRoutes);

module.exports = routes;
