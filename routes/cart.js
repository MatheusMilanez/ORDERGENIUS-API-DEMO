module.exports = app => {
  const Cart = app.db.models.Cart;

  // Visualizar carrinho por idTable
  app.get('/cart/table/:idTable', (req, res) => {
      Cart.findAll({ where: { idTable: req.params.idTable } })
          .then(result => res.json(result))
          .catch(error => res.status(412).json({ msg: error.message }));
  });

  // Adicionar ou remover item do carrinho
  app.post('/cart', async (req, res) => {
      const { idTable, productId, quantity } = req.body;
      try {
          const existingItem = await Cart.findOne({ where: { idTable, productId } });
          if (existingItem) {
              existingItem.quantity += quantity;
              if (existingItem.quantity <= 0) {
                  await existingItem.destroy();
              } else {
                  await existingItem.save();
              }
          } else if (quantity > 0) {
              await Cart.create({ idTable, productId, quantity });
          }
          res.json({ success: true });
      } catch (error) {
          res.status(412).json({ msg: error.message });
      }
  });

  // Deletar um item do carrinho
  app.delete('/cart/table/:idTable/item/:itemId', async (req, res) => {
      const { idTable, itemId } = req.params;
      try {
          const item = await Cart.findByPk(itemId);
          if (!item) {
              return res.status(404).json({ msg: 'Item não encontrado no carrinho.' });
          }
          await item.destroy();
          res.sendStatus(204); // No Content
      } catch (error) {
          res.status(412).json({ msg: error.message });
      }
  });

  // Finalizar pedido e limpar carrinho
  app.post('/cart/finalize/:idTable', async (req, res) => {
      const { idTable } = req.params;
      try {
          // Deleta todos os itens do carrinho associados à mesa
          await Cart.destroy({ where: { idTable } });
          res.json({ success: true });
      } catch (error) {
          res.status(412).json({ msg: error.message });
      }
  });
};
