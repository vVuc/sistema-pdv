const { Router } = require('express');
const { createNewOrder,listAllOrders } = require('../controllers/order.controller');
const routes = Router();

routes.post('/', createNewOrder);
routes.get('/', listAllOrders);

module.exports = routes;
