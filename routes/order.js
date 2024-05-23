
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
    })
    .post((req, res) => {
      //"/Order" cadastrar um novo pedido
      Order.create(req.body)
        .then(result => {
            res.json(result) 
        })
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
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