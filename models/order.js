// models/Order.js
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    idOrder: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_order' 
    },
    titleProduct: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      field: 'title_product' 
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    foodStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      field: 'food_status' 
    },
    idTable: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tables_d_bs', // Nome exato da tabela de referência
        key: 'id_table' // Nome exato da coluna de referência
      },
      allowNull: false,
      field: 'id_table' // Define explicitamente o nome da coluna
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    tableName: 'orders', 
    freezeTableName: true 
  });

  Order.associate = (models) => {
    Order.belongsTo(models.TablesDB, {
      foreignKey: 'idTable'
    });
  };

  return Order;
};
