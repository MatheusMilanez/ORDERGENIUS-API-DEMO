
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title_products: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

  });

   
  Order.associate = (models) => {
    // Associação inversa: uma mesa pode ter vários pedidos
    Order.hasMany(models.Order, {
      foreignKey: "tableId", 
    });
  };


  return Order;
}
