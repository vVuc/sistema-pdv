const {
  insertNewClientService,
  clientUpdateService,
  getClientInfoService,
  clientSelectService,
} = require('../services/client.service.js');

const insertNewClientController = async (req, res) => {
  const result = await insertNewClientService(req.body);
  res.status(201).json(result);
};

const clientUpdateController = async (req, res) => {
  req.body.id = req.params.id;
  const result = await clientUpdateService(req.body);
  res.status(201).json(result);
};

const getClientInfoController = async (req, res) => {
  const { id } = req.params;

  const result = await getClientInfoService(id);
  return res.json(result);
};

const selectClientsController = async (req, res) => {
  const result = await clientSelectService();
  res.status(200).json(result);
};

module.exports = {
  insertNewClientController,
  clientUpdateController,
  selectClientsController,
  getClientInfoController,
};
