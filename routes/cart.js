module.exports = app => {
    const Cart = app.db.models.Cart;

    app.route("/cart")
    .get((req, res) => {
      // "/cart": Lista todos os carrinhos 
      Cart.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        })
    });

  
    // Adicionar item ao carrinho
    app.post('/cart', (req, res) => {
      Cart.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.status(412).json({ msg: error.message }));
    });
  
    // Visualizar carrinho por idTable
    app.get('/cart/table/:idTable', (req, res) => {
      Cart.findAll({ where: { idTable: req.params.idTable } })
        .then(result => res.json(result))
        .catch(error => res.status(412).json({ msg: error.message }));
    });
  
    // Atualizar quantidade de item no carrinho
    app.put('/cart/:id', (req, res) => {
      Cart.update(req.body, { where: { id: req.params.id } })
        .then(result => res.sendStatus(204))
        .catch(error => res.status(412).json({ msg: error.message }));
    });
  
    // Remover item do carrinho
    app.delete('/cart/:id', (req, res) => {
      Cart.destroy({ where: { id: req.params.id } })
        .then(result => res.sendStatus(204))
        .catch(error => res.status(412).json({ msg: error.message }));
    });
  };
  