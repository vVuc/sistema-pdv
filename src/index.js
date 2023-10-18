require('dotenv').config();
require('express-async-errors');
const express = require('express');
const routes = require('./routes/routes');
const { allErrors } = require('./middlewares/global.middleware'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);
app.use(allErrors);

app.listen(port, () => {
  (`Servidor rodando na porta ${port}`);
});
