module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        idUser:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
            notEmpty: true
            }
        },
        cpf:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }    
    }, {
        tableName: 'User',
        freezeTableName: true
    });

    User.associate = (models) => {
        User.hasMany(models.User, 
            { foreignKey: 'idUser', as: 'User' }
        );
    }

    return User;
}