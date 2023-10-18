const validateFields = require('../utils/validateFields');
const validateFieldsIsNumeric = require('../utils/validateFieldsIsNumeric');
const validateFieldsIsNumericInt = require('../utils/validaFieldsIsNumericInt');
const CustomError = require('../utils/CustomError');
const {
  createNewOrderRepository,
  listAllOrdersByClient_idRepository,
} = require('../repositories/order.repository');
const sendMail = require('../utils/SendEmail');
const validateFieldIsIntPositive = require('../utils/validateFieldIsIntPositive');
const { selectAll, selectAllById } = require('../utils/comon_queries');
const createNewOrderService = async (dataNewOrder) => {
  const { body } = dataNewOrder;

  validateFields(['cliente_id', 'pedido_produtos'], body);

  const { cliente_id, pedido_produtos } = body;

  validateFieldsIsNumeric(['cliente_id'], { cliente_id });

  validateFieldsIsNumericInt(['cliente_id'], { cliente_id });

  validateFieldIsIntPositive(['cliente_id'], { cliente_id });


  const clientExists = await selectAllById('clientes', cliente_id);

  if (!clientExists.rowCount)
    throw new CustomError('Por favor, verifique se o cliente existe.', 400);

  if (pedido_produtos.length < 1)
    throw new CustomError(
      'O array produtos deve ter pelo ao menos um produto cadastrado.',
      400
    );

  for (const product of pedido_produtos) {
    validateFields(['produto_id', 'quantidade_produto'], product);
    validateFieldsIsNumeric(['produto_id', 'quantidade_produto'], product);
    validateFieldsIsNumericInt(['produto_id', 'quantidade_produto'], product);
    validateFieldIsIntPositive(product.produto_id);
    validateFieldIsIntPositive(product.quantidade_produto);
    const productExists = await selectAllById('produtos', product.produto_id);
    if (!productExists.rowCount)
      throw new CustomError(
        `Produto de id: ${product.produto_id} do objeto ${JSON.stringify(
          product
        )} inexistente, favor especificar um id válido.`,
        400
      );
  }

  const result = await createNewOrderRepository(body);

  const clientMail = clientExists.rows[0].email;

  await sendMail(clientMail, result[0]);

  return result[0];
};

const listAllOrdersService = async (req) => {
  const { cliente_id } = req.query;
  if (isNaN(Number(cliente_id)) && cliente_id !== undefined) {
    throw new CustomError(
      'O id do cliente deve ser um número.',
      400
    );
  }
  return !cliente_id ? await selectAll('pedidos') : await listAllOrdersByClient_idRepository(cliente_id);
};

module.exports = {
  createNewOrderService,
  listAllOrdersService,
};
