const { Router } = require('express');
const {
  insertNewClientController,
  clientUpdateController,
  selectClientsController,
  getClientInfoController,
} = require('../controllers/client.controller.js');
const {
  insertAndUpdateMiddleware,
} = require('../middlewares/insertAndUpdateClientMiddleware.js');
const routes = Router();

routes.get('/', selectClientsController);
routes.get('/:id', getClientInfoController);
routes.post('/', insertAndUpdateMiddleware, insertNewClientController);
routes.put('/:id', insertAndUpdateMiddleware, clientUpdateController);

module.exports = routes;
