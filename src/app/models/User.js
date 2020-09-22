const { Model, DataTypes } = require('sequelize');


class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            passwd: {
                type:DataTypes.STRING,
                select: false,
            },
        },{
            sequelize
        })
    }
    
    static associate(models) {
        this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
        this.belongsToMany(models.Tech, { foreignKey: 'user_id', through:'user_techs', as: 'techs' });
    }
}

module.exports = User;