const { Router } = require('express');
const {
  userInfo,
  userUpdateController,
} = require('../controllers/user.controller');
const routes = Router();

routes.get('/', userInfo);
routes.put('/', userUpdateController);
module.exports = routes;
