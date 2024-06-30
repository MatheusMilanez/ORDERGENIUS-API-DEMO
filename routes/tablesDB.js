module.exports = app => {
    const TablesDB = app.db.models.TablesDB;
    const { Order } = app.db.models;

    // QRCode
    const QRCode = require('qrcode');

    app.get("/tables/qrcodes", async (req, res) => {
        try {
            const tables = await TablesDB.findAll({});
            const qrcodes = await Promise.all(tables.map(async (table) => {
                const qrString = await QRCode.toString(`http://localhost:3001/tables/${table.idTable}`, {
                    errorCorrectionLevel: 'H',
                    type: 'svg'
                });
                return {
                    idTable: table.idTable,
                    qrcode: qrString
                };
            }));
            res.json(qrcodes);
        } catch (error) {
            res.status(412).json({ msg: error.message });
        }
    });

    app.get("/tables/:idTable/qrcode", async (req, res) => {
        try {
            const table = await TablesDB.findByPk(req.params.idTable);

            if (table) {
                const qrString = await QRCode.toString(`http://localhost:3001/tables/${table.idTable}`, {
                    errorCorrectionLevel: 'H',
                    type: 'svg'
                });

                res.json({ idTable: table.idTable, qrcode: qrString });
            } else {
                res.status(404).json({ msg: "Mesa não encontrada." });
            }
        } catch (error) {
            res.status(412).json({ msg: error.message });
        }
    });

    // Listar todas as mesas
    app.get("/tables", (req, res) => {
        TablesDB.findAll({})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    // Buscar mesa por ID
    app.get("/tables/:idTable", (req, res) => {
        TablesDB.findByPk(req.params.idTable, {
            attributes: ["idTable", "title"]
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    app.delete("/tables/:idTable", (req, res) => {
        console.log(`Recebida solicitação para deletar a mesa com id ${req.params.idTable}`);  // Log de depuração
        TablesDB.destroy({ where: { idTable: req.params.idTable } })
            .then(result => {
                if (result) {
                    res.sendStatus(204); // No Content
                    console.log(`Mesa com id ${req.params.idTable} deletada com sucesso`);  // Log de depuração
                } else {
                    res.status(404).json({ msg: "Mesa não encontrada." });
                    console.log(`Mesa com id ${req.params.idTable} não encontrada`);  // Log de depuração
                }
            })
            .catch(error => {
                res.status(412).json({ msg: error.message });
                console.error(`Erro ao deletar mesa com id ${req.params.idTable}: ${error.message}`);  // Log de depuração
            });
    });

    // Adicionar nova mesa
    app.post("/tables", async (req, res) => {
        try {
            // Buscar todas as mesas
            const tables = await TablesDB.findAll({
                attributes: ['idTable'],
                order: [['idTable', 'ASC']]
            });

            // Encontrar o menor ID disponível
            let newId = 1;
            for (let table of tables) {
                if (table.idTable != newId) {
                    break;
                }
                newId++;
            }

            // Criar a nova mesa com o ID disponível
            const newTable = await TablesDB.create({
                idTable: newId,
                title: req.body.title
            });

            res.json(newTable);
        } catch (error) {
            res.status(412).json({ msg: error.message });
        }
    });

    // Buscar pedidos por mesa
    app.get("/tables/:id/orders", (req, res) => {
        TablesDB.findByPk(req.params.id, {
            include: [{
                model: Order,
                as: 'orders'
            }]
        })
            .then(result => {
                if (result) {
                    res.json(result);
                } else {
                    res.status(404).json({ msg: "Mesa não encontrada" });
                }
            })
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    // Endpoint para pagar e limpar os pedidos da mesa
    app.delete("/tables/:idTable/pay", async (req, res) => {
        const { idTable } = req.params;

        try {
            // Deleta todos os pedidos associados à mesa
            await Order.destroy({
                where: { idTable }
            });

            res.sendStatus(204); // No Content
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });
};
