module.exports = app => {
    app.db.sequelize.sync().then(() => {
        app.listen(app.get("port"), () => {
            console.log(`Order Genius = porta ${app.get("port")}`);
        });
    });
}