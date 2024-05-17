// models/TablesDB.js
module.exports = (sequelize, DataTypes) => {
    const TablesDB = sequelize.define("TablesDB", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
  
    TablesDB.associate = (models) => {
      // Associação inversa: uma mesa pode ter vários pedidos
      TablesDB.hasMany(models.Order, {
        foreignKey: "tableId", 
      });
    };
  
    return TablesDB;
  };
  