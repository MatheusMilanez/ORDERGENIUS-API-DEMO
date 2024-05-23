// models/TablesDB.js
module.exports = (sequelize, DataTypes) => {
  
  const TablesDB = sequelize.define('TablesDB', {
    idTable: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_table' 
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'tables_d_bs', 
    freezeTableName: true 
  });

  TablesDB.associate = (models) => {
    TablesDB.hasMany(models.Order, {
      foreignKey: 'idTable',
      as: 'orders'
    });
  };

  return TablesDB;
};
