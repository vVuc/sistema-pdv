const {
  createNewOrderService,
  listAllOrdersService,
} = require('../services/order.service');

const createNewOrder = async (req, res) => {
  const result = await createNewOrderService(req);

  res.status(201).json(result);
};

const listAllOrders = async (req, res) => {
  const result = await listAllOrdersService(req);

  res.status(200).json(result.rows[0]);

};

module.exports = {
  createNewOrder,
  listAllOrders,
};
