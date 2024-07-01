// ordersController.js

module.exports = app => {
  const Order = app.db.models.Order;
  const Cart = app.db.models.Cart;
  const Products = app.db.models.Products;

  // Listar todos os pedidos
  app.get("/orders", (req, res) => {
    Order.findAll({})
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  });

  // Criar um novo pedido a partir dos itens do carrinho para uma mesa específica
  app.post('/orders/from-cart/:idTable', async (req, res) => {
    const { idTable } = req.params;

    try {
      // Obtém os itens do carrinho para a mesa específica
      const cartItems = await Cart.findAll({
        where: { idTable },
        include: [{ model: Products, as: 'products' }]
      });

      // Verifica se há itens no carrinho
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ success: false, message: 'Nenhum item encontrado no carrinho.' });
      }

      // Cria pedidos ou atualiza a quantidade com base nos itens do carrinho
      const orders = await Promise.all(cartItems.map(async item => {
        // Verifica se o pedido já existe
        const existingOrder = await Order.findOne({
          where: {
            idTable: item.idTable,
            titleProduct: item.products.titleProducts, // Verifique se 'titleProducts' é o campo correto
            done: false
          }
        });

        if (existingOrder) {
          // Atualiza a quantidade se o pedido já existir
          existingOrder.quantity += item.quantity;
          await existingOrder.save();
          return existingOrder;
        } else {
          // Cria um novo pedido se não existir
          return await Order.create({
            titleProduct: item.products.titleProducts, // Verifique o nome do campo correto
            price: item.products.price,
            idTable: item.idTable,
            quantity: item.quantity,
            foodStatus: item.products.foodStatus,
            done: false
          });
        }
      }));

      // Limpa o carrinho após criar os pedidos
      await Cart.destroy({
        where: { idTable }
      });

      res.status(201).json({ success: true, orders });
    } catch (error) {
      console.error(error); // Adicione um log detalhado do erro para facilitar a depuração
      res.status(500).json({ success: false, message: 'Erro ao finalizar o pedido.' });
    }
  });

  // Listar pedidos por mesa específica
  app.get("/orders/table/:idTable", (req, res) => {
    Order.findAll({ where: { idTable: req.params.idTable } })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  });

  // Consultar pedido por ID
  app.get("/orders/:idOrder", (req, res) => {
    Order.findOne({ where: { id: req.params.idOrder } })
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  });

// Endpoint para atualizar um pedido por ID
app.put("/orders/:idOrder", async (req, res) => {
  const { idOrder } = req.params;
  const { done } = req.body;

  try {
      // Verifica se o pedido com o ID especificado existe
      const order = await Order.findByPk(idOrder);
      if (!order) {
          return res.status(404).json({ message: 'Pedido não encontrado.' });
      }

      // Atualiza o estado do pedido para entregue (done = true)
      order.done = done;
      await order.save();

      res.status(200).json({ message: 'Pedido atualizado com sucesso.', order });
  } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      res.status(500).json({ message: 'Erro interno ao atualizar pedido.' });
  }
});


  // Deletar pedido por ID
  app.delete("/orders/:idOrder", (req, res) => {
    Order.destroy({ where: { id: req.params.idOrder } })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  });
};
