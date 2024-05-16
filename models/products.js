module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        title_products: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true
            }
        },
        price: {
            type: DataTypes.REAL,
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

        Products.associate = (models) => {
            Products.belongsTo(models.Order);
        }

        return Products;
}