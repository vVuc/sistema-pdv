const { decode, verify } = require('jsonwebtoken');

module.exports = (token) => {
  return decode(token);
};

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(400).json({ mensagem: 'Token não enviado' });

  const token = authorization.split(' ')[1];
  try {
    verify(token, process.env.KEY_JWT);

    const { id } = decode(token);

    req.body.user = { id };

    next();
  } catch (error) {
    res.status(401).json({ mensagem: 'Token invalido' });
  }
};

module.exports = { auth };
