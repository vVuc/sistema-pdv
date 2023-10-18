const pool = require('../configs/connection');

const userUpdateRepository = async (userData) => {
  const { user, email, senha, nome } = userData;

  const queryUpdateUser = `
    UPDATE usuarios
    SET nome = $1, 
        email = $2, 
        senha = $3
    WHERE id = $4;
  `;

  await pool.query(queryUpdateUser, [nome, email, senha, user.id]);

  return;
};

const getDataUseByIDRepository = async (idUser) => {
  const queryGetDataUserById = `
    SELECT id, email, nome FROM usuarios WHERE id = $1
  `;
  const result = await pool.query(queryGetDataUserById, [idUser]);

  return result;
};

const getEmailRepository = async (email) => {
  const queryGetEmail = `
    SELECT email, senha, id FROM usuarios WHERE email = $1
  `;
  const result = await pool.query(queryGetEmail, [email]);

  return result;
};

module.exports = {
  userUpdateRepository,
  getDataUseByIDRepository,
  getEmailRepository,
};
