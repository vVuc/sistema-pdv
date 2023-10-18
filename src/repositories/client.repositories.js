const pool = require('../configs/connection');

const getEmailClienteRepository = async (email) => {
  const query = 'SELECT email FROM clientes WHERE email = $1';
  const result = await pool.query(query, [email]);

  return result;
};

const verifyUniqueDataClientRepository = async (email, cpf) => {
  const query = 'SELECT * FROM clientes WHERE email = $1 OR cpf = $2';
  const result = await pool.query(query, [email, cpf]);

  return result;
};

const clientUpdateRepository = async (data) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado, id } =
    data;

  const query = `
  UPDATE clientes 
  SET nome=$1,
  email=$2,
  cpf=$3,
  cep=$4,
  rua=$5,
  numero=$6,
  bairro=$7,
  cidade=$8,
  estado=$9
  WHERE id=$10 returning *;
  `;
  const result = await pool.query(query, [
    nome,
    email,
    cpf,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    id,
  ]);

  return result;
};

module.exports = {
  getEmailClienteRepository,
  verifyUniqueDataClientRepository,
  clientUpdateRepository,
};
