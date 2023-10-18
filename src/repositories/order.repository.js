const pool = require('../configs/connection');
const CustomError = require('../utils/CustomError');
const { InsertIntoData } = require('../utils/comon_queries');

const createNewOrderRepository = async (dataOrder) => {
  const { cliente_id, pedido_produtos, observacao } = dataOrder;
  //verifica se o produto esta no banco de dados através do ID
  let productBD = null;

  //Abre uma transação no banco de dados.
  await pool.query('BEGIN');

  //cria uma pedido.
  const currentOrder = await pool.query(
    'INSERT INTO pedidos (cliente_id, observacao, valor_total) VALUES ($1, $2, $3) RETURNING *',
    [cliente_id, observacao, 0]
  );

  let totalOrder = 0;

  let resultOfReturningRequisition = [
    {
      pedido_produtos: [],
    },
  ];

  for (const productInfo of pedido_produtos) {
    productBD = await pool.query(
      'SELECT valor, id, quantidade_estoque, descricao FROM produtos WHERE id = $1 LIMIT 1',
      [productInfo.produto_id]
    );

    productBD = productBD.rows[0];
    if (productBD.quantidade_estoque < productInfo.quantidade_produto) {
      await pool.query('ROLLBACK');
      throw new CustomError(
        `Quantidade do produto: ${JSON.stringify(
          productInfo
        )} insuficiente em nosso estoque.`,
        400
      );
    }

    totalOrder += productBD.valor * productInfo.quantidade_produto;

    const quantityOfUpdateProduct =
      productBD.quantidade_estoque - productInfo.quantidade_produto;

    await pool.query(
      'UPDATE produtos SET quantidade_estoque = $1 WHERE id = $2',
      [quantityOfUpdateProduct, productBD.id]
    );

    const insertData = {
      pedido_id: currentOrder.rows[0].id,
      produto_id: productBD.id,
      quantidade_produto: productInfo.quantidade_produto,
      valor_produto: productBD.valor
    };
    await InsertIntoData('pedido_produtos', insertData);
    const objectProducts = {};

    objectProducts.item = productBD.descricao;
    objectProducts.quantidade = productInfo.quantidade_produto;
    objectProducts.valor = productInfo.quantidade_produto * productBD.valor;
    resultOfReturningRequisition[0].pedido_produtos.push(objectProducts);
  }

  await pool.query('UPDATE pedidos SET valor_total = $1 WHERE id = $2', [
    totalOrder,
    currentOrder.rows[0].id,
  ]);

  await pool.query('COMMIT');

  resultOfReturningRequisition[0].observacao = observacao;
  resultOfReturningRequisition[0].idPedido = currentOrder.rows[0].id;
  resultOfReturningRequisition[0].precoTotal = totalOrder;

  return resultOfReturningRequisition;
};

const listAllOrdersByClient_idRepository = async (cliente_id) => {
  const result = await pool.query(
    'SELECT * FROM pedidos WHERE cliente_id = $1',
    [cliente_id]
  );
  return result.rows;
};

const listOrdersByProduct_idRepository = async (produto_id) => {
  const result = await pool.query(
    'SELECT * FROM pedido_produtos WHERE produto_id = $1',
    [produto_id]
  );
  return result.rows;
};
module.exports = {
  createNewOrderRepository,
  listAllOrdersByClient_idRepository,
  listOrdersByProduct_idRepository,
};
