const nodemailer = require('nodemailer');
require('dotenv').config();

const setUpTable = (objectTable) => {
  let tableData = '';
  objectTable.pedido_produtos.forEach((productInfos) => {
    tableData += '<tr>';
    tableData += '<td>';
    tableData += `${productInfos.item}`;
    tableData += '</td>';

    tableData += '<td>';
    tableData += `${productInfos.quantidade}`;
    tableData += '</td>';

    tableData += '<td>';
    tableData += `${(productInfos.valor / 100).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })}`;
    tableData += '</td>';
    tableData += '</tr>';
  });
  tableData += '<tr>';
  tableData += '<td class="card-total" colspan="2">Total:</td>';
  tableData +=
    '<td>' +
    (objectTable.precoTotal / 100).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  +'</td>';
  tableData + '</tr>';
  return tableData;
};
console.log({
  user: process.env.USERMAILSERVICE,
  pass: process.env.PASSWORDMAILSERVICE,
},);
module.exports = async (custumerMail, objectTable) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERMAILSERVICE,
      pass: process.env.PASSWORDMAILSERVICE,
    },
  });
  transport.sendMail({
    from: '<codebustersbrasil@gmail.com>',
    to: custumerMail,
    subject: 'Confirmação de pedido realizado codebusters.',
    html:
      `
    <html>
    <head>
      <style>
        /* Estilos gerais do card */
        .card {
          width: 600px;
          margin: 20px auto;
          border: 2px solid #333;
          border-radius: 10px;
          box-shadow: 5px 5px 10px #999;
          font-family: Arial, sans-serif;
        }

        /* Estilos do cabeçalho do card */
        .card-header {
          background-color: #333;
          color: white;
          padding: 10px;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
        }

        /* Estilos do corpo do card */
        .card-body {
          padding: 10px;
        }

        /* Estilos da observação do pedido */
        .card-observation {
          font-style: italic;
          color: #666;
          margin-bottom: 10px;
        }

        /* Estilos da tabela dos itens do pedido */
        .card-table {
          width: 100%;
          border-collapse: collapse;
        }

        /* Estilos das células da tabela */
        .card-table td {
          border: 1px solid #ccc;
          padding: 5px;
        }

        /* Estilos das células do cabeçalho da tabela */
        .card-table th {
          background-color: #eee;
          border: 1px solid #ccc;
          padding: 5px;
          text-align: left;
        }

        /* Estilos da célula do total do pedido */
        .card-total {
          font-weight: bold;
          text-align: right;
        }
      </style>
    </head>
    <body>
      <h1>Confirmação de pedido realizado!</h1>
      <div class="card">
        <div class="card-header">
          Pedido ${objectTable.idPedido} 
        </div>
        <div class="card-body">
          <div class="card-observation">
            Observação: ${objectTable.observacao}
          </div>
          <table class="card-table">
            <tr>
              <th>Item</th>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>` +
      setUpTable(objectTable) +
      `</table>
        </div>
      </div>
    </body>
    </html>`,
  });
};
