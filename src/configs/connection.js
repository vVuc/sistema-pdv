const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST_PG,
  port: process.env.PORT_PG,
  user: process.env.USER_PG,
  password: process.env.PASSWORD_PG,
  database: process.env.DATABASE_PG,
});

module.exports = pool;
