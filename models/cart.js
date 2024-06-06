module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    idTable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tables_d_bs', // Nome exato da tabela de referência
        key: 'id_table' // Nome exato da coluna de referência
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products', // Nome exato da tabela de referência
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });

  Cart.associate = models => {
    Cart.belongsTo(models.TablesDB, { foreignKey: 'idTable', as: 'tables' }); // Certifique-se de que 'TablesDB' esteja correto
    Cart.belongsTo(models.Products, { foreignKey: 'productId', as: 'products' }); // Certifique-se de que 'Products' esteja correto
  };

  return Cart;
};
