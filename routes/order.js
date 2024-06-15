
module.exports = app => {
  const Order = app.db.models.Order;
  const Products = app.db.models.Products;



  app.route("/orders")
    .get((req, res) => {
      // "/Order": Lista Tarefas 
      Order.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        })
    });

    // Criar um novo pedido a partir dos itens do carrinho
    app.post('/orders/from-cart/:idTable', async (req, res) => {
      const { idTable } = req.params;
    
      try {
        // Obtém os itens do carrinho para a mesa específica
        const cartItems = await app.db.models.Cart.findAll({
          where: { idTable },
          include: [{ model: app.db.models.Products, as: 'products' }]
        });
    
        // Cria pedidos ou atualiza a quantidade com base nos itens do carrinho
        const orders = await Promise.all(cartItems.map(async item => {
          // Verifica se o pedido já existe
          const existingOrder = await Order.findOne({
            where: {
              idTable: item.idTable,
              titleProduct: item.products.titleProducts,
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
              titleProduct: item.products.titleProducts,
              price: item.products.price,
              idTable: item.idTable,
              quantity: item.quantity,
              foodStatus: item.products.foodStatus,
              done: false
            });
          }
        }));
    
        // Limpa o carrinho após criar os pedidos
        await app.db.models.Cart.destroy({
          where: { idTable }
        });
    
        res.status(201).json(orders);
      } catch (error) {
        res.status(412).json({ msg: error.message });
      }
    });
    
    
    
    app.get("/orders/table/:idTable", (req, res) => {
      Order.findAll({ where: { tableId: req.params.idTable } })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });
    

    app.route("/orders/:idOrder")
      .get((req, res) => {
        //"/Order/1" consultar pedido
        Order.findOne({where: req.params})
          .then(result => {
            if(result){
              res.json(result);
            }else{
              res.sendStatus(404);
            }
          })
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
        //"/Order/1" atualizar pedido
        Order.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });

      })
      .delete((req, res) => {
        //"/Order/1" deletar pedido
        Order.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
}