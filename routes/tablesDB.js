module.exports = app => {
    const TablesDB = app.db.models.TablesDB;

    app.get("/tables", (req, res) => {
        TablesDB.findAll({})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            })
    })

    app.get("/tables/:id", (req, res) => {
        //findById não está definido , temos que usar o FindByPk (Find By Primary Key) 
        TablesDB.findByPk(req.params.id, {
            attributes: ["id", "title"]
        })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });

    app.delete("/tables/:id", (req, res) => {
        TablesDB.destroy({where: {id: req.params.id}})
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.post("/tables", (req, res) => {
        TablesDB.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });
}