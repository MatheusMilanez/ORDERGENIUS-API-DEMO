var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

let db = null;

module.exports = app => {
    if(!db){
        const config = app.libs.config;
        const sequelize = new Sequelize (
            config.database,
            config.username,
            config.password,
            config.params
        );

        db = {
            sequelize,
            Sequelize,
            models: []
        };

        const dir = path.join(__dirname, "models");
        fs.readdirSync(dir).forEach(file => {
            const modelsDir = path.join(dir, file);
            const models = require(modelsDir)(sequelize, Sequelize.DataTypes);
            db.models[models.name] = models;
        });

        Object.keys(db.models).forEach(key => {
            db.models[key].associate(db.models);
        });
    }
    return db;
}