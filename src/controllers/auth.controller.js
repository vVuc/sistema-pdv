
const { logInService } = require('../services/login.service');
const { registerService } = require('../services/register.service');

const logInController = async (req, res) => {
  const logIn = await logInService(req.body);

  return res.status(201).json(logIn);
};

const signUp = async (req, res) => {
  const createNewUser = await registerService(req.body);
  return res.status(201).json(createNewUser);
};

module.exports = { logInController, signUp };
