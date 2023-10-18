const {
  userUpdateService,
  infoUserService,
} = require('../services/user.service');
const message = require('../utils/message');

const userInfo = async (req, res) => {
  const { body } = req;

  const result = await infoUserService(body);

  res.status(200).json(result);
};

const userUpdateController = async (req, res) => {
  await userUpdateService(req.body);

  return res.status(200).json(message('Usuário atualizado com sucesso!'));
};

module.exports = { userInfo, userUpdateController };
