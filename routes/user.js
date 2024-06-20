module.exports = app => {
    const User = app.db.models.User;

    app.get("/user", (req, res) => {
        User.findAll({})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/user/:idUser", (req, res) => {
        User.findByPk(req.params.idUser, {
            attributes: ["idUser", "userName", "cpf", "password"]
        })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });

    app.delete("/user/:idUser", (req, res) => {
        User.destroy({where: {id: req.params.idUser}})
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });

    app.post("/user", (req, res) => {
        User.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });


};
