module.exports = app => {
    
    const Products = app.db.models.Products;

    app.get("/products", (req, res) => {
        Products.findAll({})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/products/:id", (req, res) => {
        Products.findByPk(req.params.id, {
            atributes: ["id", "title_products","price"]
        })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });


    app.delete("/products/:id", (req, res) => {
        Products.destroy({where: {id: req.params.id}})
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg: error.message})
            });
    });

    app.post("/products", (req, res) => {
        Products.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });
}