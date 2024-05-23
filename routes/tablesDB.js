module.exports = app => {
    const TablesDB = app.db.models.TablesDB;
    const { Order } = app.db.models; 

    //Qrcode
        const QRCode = require('qrcode');

    app.get("/tables/qrcodes", async (req, res) => {
        
        try {
            const tables = await TablesDB.findAll({});
            const qrcodes = await Promise.all(tables.map(async (table) => {
                const qrString = await QRCode.toString(`/tables/${table.idTable}`,{
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
            res.status(412).json({msg: error.message});
        }
   
    });


    app.get("/tables/:idTable/qrcode",async (req, res) => {
        
        try {
            const table = await TablesDB.findByPk(req.params.idTable);

            if(table){
                const qrString = await QRCode.toString(`/tables/${table.idTable}`, {
                    errorCorrectionLevel: 'H',
                    type: 'svg'
                });

                res.json({idTable: table.idTable, qrcode: qrString});
            }else {
                res.status(404).json({msg: "Mesa não encontrada."});
            }
        }catch (error) {
            res.status(412).json({msg: error.message});
        }
   
    })
    

    // --------------------------------------
    app.get("/tables", (req, res) => {
        TablesDB.findAll({})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            })
    });

    app.get("/tables/:idTable", (req, res) => {
        //findById não está definido , temos que usar o FindByPk (Find By Primary Key) 
        TablesDB.findByPk(req.params.idTable, {
            attributes: ["idTable", "title"]
        })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });

    app.delete("/tables/:idTable", (req, res) => {
        TablesDB.destroy({where: {id: req.params.idTable}})
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
                res.status(404).json({msg: "Mesa não encontrada"});
            }
        })
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });

    app.get("/tables/:id/orders", (req, res) => {
        Order.findAll({
            where: {id_table: req.params.id}
        })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });

    
}